import React from "react";
import { getDataForRoute } from "@/utils/getData";
import LiveTrackButton from "@/components/LiveTrackButton"; // Adjust the path
import Image from "next/image";

export const generateMetadata = async ({ params }: any) => {
  const { route } = await params;
  const words = route.split("-");
  const sourceCity = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const destinationCity = words[2].charAt(0).toUpperCase() + words[2].slice(1);
  const routeData = await getDataForRoute(
    words.slice(0, words.length - 2).join("-")
  );

  if (!routeData?.trainScheduleData) {
    return {
      title: `Train Schedule: ${sourceCity} to ${destinationCity} - Route Not Found`,
      description: `Train schedule from ${sourceCity} to ${destinationCity} is not available.`,
    };
  }

  const intercityTrains =
    routeData.trainScheduleData.find(
      (category: any) => category.category === "Intercity"
    )?.schedules || [];
  const localTrains =
    routeData.trainScheduleData.find(
      (category: any) => category.category === "Local"
    )?.schedules || [];

  const trainNames = [
    ...intercityTrains.map((train: any) => train.trainName),
    ...localTrains.map((train: any) => train.trainName),
  ].join(", ");

  return {
    title: `Train Schedule: ${sourceCity} to ${destinationCity} - ${trainNames}`,
    description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days for ${trainNames}.`,
    openGraph: {
      title: `Train Schedule: ${sourceCity} to ${destinationCity} - ${trainNames}`,
      description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days for ${trainNames}.`,
      url: `https://www.trainjatri.com/routes/${route}`,
      siteName: "Train Jatri",
      type: "website",
      images: "/train-jatri.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: `Train Schedule: ${sourceCity} to ${destinationCity} - ${trainNames}`,
      description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days for ${trainNames}.`,
      images: ["/train-jatri.jpg"],
    },
  };
};

const Page = async ({ params }: any) => {
  const { route } = await params;
  const words = route.split("-");
  const routeData = await getDataForRoute(
    words.slice(0, words.length - 2).join("-")
  );
  const sourceCity = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const destinationCity = words[2].charAt(0).toUpperCase() + words[2].slice(1);

  const intercityTrains =
    routeData.trainScheduleData.find(
      (category: any) => category.category === "Intercity"
    )?.schedules || [];
  const localTrains =
    routeData.trainScheduleData.find(
      (category: any) => category.category === "Local"
    )?.schedules || [];

  if (
    !routeData ||
    !routeData.trainScheduleData ||
    routeData.trainScheduleData.length === 0
  ) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-gray-700 text-center">
          <p className="text-lg mb-4">
            Train schedule information for {route} route. No data available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="p-4">
          <h1 className="text-4xl font-extrabold  mb-8 text-center capitalize">
            {route.split("-").join(" ")}
          </h1>
          <p className="text-lg  mb-8 text-center">
            This page provides the train schedule for trains traveling from{" "}
            {sourceCity} to {destinationCity}. You can find information about
            train departure times, arrival times, durations, and off days. We
            have included both intercity and local train schedules for your
            convenience.
          </p>
          <p className="text-lg  mb-8 text-center">
            There are {intercityTrains.length} intercity trains and{" "}
            {localTrains.length} local trains available for this route.
          </p>

          <Image
            src="/logo.png"
            alt="Bangladesh Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto my-8"
          />
        </div>

        <div className="w-full overflow-x-auto max-w-screen p-4  whitespace-nowrap">
          {routeData.trainScheduleData.map((category: any) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-6 capitalize">
                {category.category} train schedule
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md text-center">
                  <thead>
                    <tr className="bg-gray-100">
                      {category.category == "Intercity" && (
                        <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Train No.
                        </th>
                      )}

                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Train Name
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Departs from {sourceCity}
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Arrives at {destinationCity}
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Off Day
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Duration
                      </th>

                      {category.category == "Intercity" && (
                        <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                          Status
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {category.schedules.map((schedule: any, index: any) => (
                      <tr key={index} className="border-b">
                        {category.category == "Intercity" && (
                          <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                            {schedule.trainNo}
                          </td>
                        )}

                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.trainName}
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.departs}
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.arrives}
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.offday}
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.duration}
                        </td>

                        {category.category == "Intercity" && (
                          <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                            <LiveTrackButton trainNumber={schedule.trainNo} />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
