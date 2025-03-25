import React from "react";
import { getDataForTrain } from "@/utils/getData";
import { FaTrain, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Page = async ({ params }: any) => {
  const { name } = await params;
  const trainData = await getDataForTrain(name);

  if (!trainData || !trainData.forward || !trainData.reverse) {
    return <div>Train data not found.</div>;
  }

  const forward = trainData.forward;
  const reverse = trainData.reverse;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const banglaDaysOfWeek = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const shortDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getOffDay = (days: string[]) => {
    const offDayIndex = shortDaysOfWeek.findIndex((day) => !days.includes(day));
    if (offDayIndex !== -1) {
      return `${daysOfWeek[offDayIndex]} (${banglaDaysOfWeek[offDayIndex]})`;
    }
    return "কোন বন্ধের দিন নেই";
  };

  const forwardOffDay = getOffDay(forward.days);
  const reverseOffDay = getOffDay(reverse.days);

  const forwardSource = forward.routes[0].city;
  const forwardDestination = forward.routes[forward.routes.length - 1].city;
  const forwardDepartureTime = forward.routes[0].departure_time;
  const forwardArrivalTime =
    forward.routes[forward.routes.length - 1].arrival_time;
  const forwardHours = forward.total_duration;

  const reverseSource = reverse.routes[0].city;
  const reverseDestination = reverse.routes[reverse.routes.length - 1].city;
  const reverseDepartureTime = reverse.routes[0].departure_time;
  const reverseArrivalTime =
    reverse.routes[reverse.routes.length - 1].arrival_time;
  const reverseHours = reverse.total_duration;

  const generateRouteDescription = (
    routes: any[],
    trainName: string,
    pathName: string
  ) => {
    let description = `${trainName} departs from ${routes[0].city} at ${routes[0].departure_time}. `;

    for (let i = 1; i < routes.length - 1; i++) {
      description += `Then it arrives in ${routes[i].city}, at ${routes[i].arrival_time} and then departs at ${routes[i].departure_time}. `;
    }

    description += `Finally, it arrives at the destination (${
      routes[routes.length - 1].city
    }) at ${routes[routes.length - 1].arrival_time}.`;

    return (
      <div>
        <h2 className="font-semibold  mb-4 text-center">{pathName}</h2>
        <p className="text-center">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-8 text-center capitalize flex items-center justify-center">
          <FaTrain className="mr-2" /> {forward.train_name}
        </h1>

        <div className="mx-auto p-6 text-center">
          <p className="p-2 border rounded-2xl">
            {forward.train_name} travels {forward.path} on every day of the week
            except {forwardOffDay}. It departs from {forwardSource} at{" "}
            {forwardDepartureTime}, and arrives at {forwardDestination} at{" "}
            {forwardArrivalTime}. It takes total {forwardHours}.
          </p>
          <p className="p-2 mt-4 border rounded-2xl">
            {reverse.train_name} travels {reverse.path} on every day of the week
            except {reverseOffDay}. It departs from {reverseSource} at{" "}
            {reverseDepartureTime}, and arrives at {reverseDestination} at{" "}
            {reverseArrivalTime}. It takes total {reverseHours}.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Side (Forward Route) */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="font-semibold  mb-4 text-center flex flex-col">
              <span className="text-2xl text-[#046ce6]">{forward.path}</span>
              <span className="text-xl text-[#fe1226]">
                বন্ধের দিন: {getOffDay(forward.days)}
              </span>
            </h2>

            <div className="flex flex-col items-center">
              {forward.routes.map((route: any, index: any) => (
                <div key={route.city} className="flex flex-col items-center">
                  <div className="border rounded-md p-4 m-2 min-w-[150px] flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      {index === 0 ? (
                        <FaMapMarkerAlt className="text-green-600 mr-1 text-lg" />
                      ) : index === forward.routes.length - 1 ? (
                        <FaMapMarkerAlt className="text-red-600 mr-1 text-lg" />
                      ) : (
                        <FaMapMarkerAlt className="text-indigo-600 mr-1" />
                      )}
                      <span className="font-semibold">{route.city}</span>
                    </div>
                    {index === 0
                      ? route.departure_time && (
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-1" />
                            <span>{route.departure_time}</span>
                          </div>
                        )
                      : route.arrival_time && (
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-1" />
                            <span>{route.arrival_time}</span>
                          </div>
                        )}
                  </div>
                  {index < forward.routes.length - 1 && (
                    <div className="h-8 w-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side (Reverse Route) */}
          <div className="md:w-1/2 order-first md:order-last">
            <h2 className="text-2xl flex flex-col font-semibold text-indigo-700 mb-4 text-center">
              <span className="text-2xl text-[#046ce6]">{reverse.path}</span>
              <span className="text-xl text-[#fe1226]">
                বন্ধের দিন: {getOffDay(reverse.days)}
              </span>
            </h2>
            <div className="flex flex-col items-center">
              {reverse.routes.map((route: any, index: any) => (
                <div key={route.city} className="flex flex-col items-center">
                  <div className="border rounded-md p-4 m-2 min-w-[150px] flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      {index === 0 ? (
                        <FaMapMarkerAlt className="text-green-600 mr-1 text-lg" />
                      ) : index === reverse.routes.length - 1 ? (
                        <FaMapMarkerAlt className="text-red-600 mr-1 text-lg" />
                      ) : (
                        <FaMapMarkerAlt className="text-indigo-600 mr-1" />
                      )}
                      <span className="font-semibold">{route.city}</span>
                    </div>
                    {index === 0
                      ? route.departure_time && (
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-1" />
                            <span>{route.departure_time}</span>
                          </div>
                        )
                      : route.arrival_time && (
                          <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-1" />
                            <span>{route.arrival_time}</span>
                          </div>
                        )}
                  </div>
                  {index < reverse.routes.length - 1 && (
                    <div className="h-8 w-px bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-5">
          {generateRouteDescription(
            forward.routes,
            forward.train_name,
            forward.path
          )}
        </div>

        <div className="my-5">
          {generateRouteDescription(
            reverse.routes,
            reverse.train_name,
            reverse.path
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
