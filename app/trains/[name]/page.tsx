import React from "react";
import { getDataForTrain } from "@/utils/getData";
import { FaTrain, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import Image from "next/image";

export const generateMetadata = async ({ params }: any) => {
  const { name } = params;
  const trainData = await getDataForTrain(name);

  if (!trainData || !trainData.forward) {
    return {
      title: "Train Details Not Found",
      description: "Train details could not be found.",
    };
  }

  const { forward } = trainData;

  return {
    title: `${forward.train_name}- Route & Schedule`,
    description: `Details of ${forward.train_name}, including route, schedule, and off days. Travels ${forward.path}.`,
    openGraph: {
      title: `${forward.train_name} - Route & Schedule`,
      description: `Details of ${forward.train_name}, including route, schedule, and off days. Travels ${forward.path}.`,
      url: `https://www.trainjatri.com/trains/${name}`,
      siteName: "Train Jatri",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${forward.train_name} - Route & Schedule`,
      description: `Details of ${forward.train_name}, including route, schedule, and off days. Travels ${forward.path}.`,
    },
  };
};

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

  const faqData = [
    {
      question: `What are the operating days of ${forward.train_name} from ${forward.path}?`,
      answer: `${forward.train_name} operates on ${forward.days.join(
        ", "
      )} from ${forward.path}.`,
    },
    {
      question: `What is the total duration of the journey for ${forward.train_name} from ${forward.path}?`,
      answer: `The total duration for ${forward.train_name} from ${forward.path} is ${forward.total_duration}.`,
    },
    {
      question: `Where does ${forward.train_name} start and end from ${forward.path}?`,
      answer: `${forward.train_name} starts at ${
        forward.routes[0].city
      } and ends at ${
        forward.routes[forward.routes.length - 1].city
      } that travels from ${forward.path}.`,
    },
    {
      question: `What is the weekly offday for ${forward.train_name} that travels from ${forward.path}?`,
      answer: `The weekly offday for ${forward.train_name} from ${
        forward.path
      } is ${
        forward.days.length < 7
          ? forward.days.reduce(
              (offDay: any, day: any) =>
                (offDay = [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].filter((d) => !forward.days.includes(d))[0]),
              ""
            )
          : "No offday"
      }.`,
    },
    ...forward.routes.slice(1).map((route: any) => ({
      question: `When does ${forward.train_name} arrive at ${route.city} that travels from ${forward.path}?`,
      answer: `${forward.train_name} arrives at ${route.city} at ${route.arrival_time} that travels from ${forward.path}.`,
    })),
    {
      question: `What are the operating days of ${reverse.train_name} that travels from ${reverse.path}?`,
      answer: `${reverse.train_name} operates on ${reverse.days.join(
        ", "
      )} that travels from ${reverse.path}.`,
    },
    {
      question: `What is the total duration of the journey for ${reverse.train_name} that travels from ${reverse.path}?`,
      answer: `The total duration for ${reverse.train_name} that travels from ${reverse.path} is ${reverse.total_duration}.`,
    },
    {
      question: `Where does ${reverse.train_name} start and end that travels from ${reverse.path}?`,
      answer: `${reverse.train_name} starts at ${
        reverse.routes[0].city
      } and ends at ${
        reverse.routes[reverse.routes.length - 1].city
      } that travels from ${reverse.path}.`,
    },
    {
      question: `What is the weekly offday for ${reverse.train_name} that travels from ${reverse.path}?`,
      answer: `The weekly offday for ${reverse.train_name} that travels from ${
        reverse.path
      } is ${
        reverse.days.length < 7
          ? reverse.days.reduce(
              (offDay: any, day: any) =>
                (offDay = [
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].filter((d) => !reverse.days.includes(d))[0]),
              ""
            )
          : "No offday"
      }.`,
    },
    ...reverse.routes.slice(1).map((route: any) => ({
      question: `When does ${reverse.train_name} arrive at ${route.city} that travels from ${reverse.path}?`,
      answer: `${reverse.train_name} arrives at ${route.city} at ${route.arrival_time} that travels from ${reverse.path}.`,
    })),
  ];

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

        <Image
          src="/logo.png"
          alt="Bangladesh Railway Train Journey"
          width={400}
          height={200}
          className="mx-auto my-8"
        />

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

        <Image
          src="/logo.png"
          alt="Bangladesh Railway Train Journey"
          width={400}
          height={200}
          className="mx-auto my-8"
        />

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

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center border-b pb-2 border-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
