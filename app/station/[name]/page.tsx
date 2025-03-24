import { getDataForStation } from "@/utils/getData";
import React from "react";
import Head from "next/head";
import Image from "next/image";

const StationPage = async ({ params }: any) => {
  const { name } = await params;

  const stationData = await getDataForStation(name);

  if (
    !stationData ||
    !stationData.trainScheduleData ||
    stationData.trainScheduleData.length === 0
  ) {
    return (
      <div className="p-4">
        <Head>
          <title>{name} Train Schedule - Train Jatri</title>
          <meta
            name="description"
            content={`Train schedule information for ${name} station. No data available.`}
          />
        </Head>
        Station data not found.
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Train Schedule for {name}</h1>
        <p className="mb-4">
          Explore the comprehensive train schedule for {name} station. Find
          information on train numbers, names, arrival and departure times, and
          off-days. Plan your journey with ease.
        </p>

        <Image
            src="/logo.png"
            alt="Bangladesh Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto my-8"
          />
      </div>

      <div className="w-full overflow-x-auto max-w-screen p-4">
        {stationData.trainScheduleData.map((category: any) => (
          <div key={category.category} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{category.category}</h2>

            <div className="w-full overflow-x-auto max-w-full">
              <table className="min-w-max w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train No.
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train Name
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Arrival
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Departure
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Off Day
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.trainData.map((train: any) => (
                    <tr key={train.trainNumber} className="border-b">
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.trainNumber}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.trainName}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.departure}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.destination}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.offday}
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
  );
};

export default StationPage;
