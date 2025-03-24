import React from "react";
import { getDataForRoute } from "@/utils/getData";
import Head from "next/head";
import LiveTrackButton from "@/components/LiveTrackButton"; // Adjust the path

const Page = async ({ params }: any) => {
  const { route } = await params;
  const words = route.split("-");
  const routeData = await getDataForRoute(
    words.slice(0, words.length - 2).join("-")
  );

  if (
    !routeData ||
    !routeData.trainScheduleData ||
    routeData.trainScheduleData.length === 0
  ) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Head>
          <title>{route} Train Schedule - Train Jatri</title>
          <meta
            name="description"
            content={`Train schedule information for ${route} route. No data available.`}
          />
        </Head>
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
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center capitalize">
            {route.split("-").join(" ")} Train Schedule
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Find the most up-to-date train schedules for the{" "}
            {route.split("-").slice(0, -2).join(" ")} route. Plan your journey
            with detailed departure and arrival times, train names, and
            durations. Discover all available trains and categories for this
            popular travel route in Bangladesh.
          </p>
        </div>

        <div className="w-full overflow-x-auto max-w-screen p-4  whitespace-nowrap">
          {routeData.trainScheduleData.map((category: any) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-6 capitalize">
                {category.category}
              </h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Train No.
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Train Name
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Departs
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Arrives
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Duration
                      </th>
                      <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.schedules.map((schedule: any) => (
                      <tr key={schedule.trainNo} className="border-b">
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          {schedule.trainNo}
                        </td>
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
                          {schedule.duration}
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-gray-800">
                          <LiveTrackButton trainNumber={schedule.trainNo} />
                        </td>
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
