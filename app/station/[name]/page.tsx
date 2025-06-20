import { getDataForStation } from "@/utils/getData";
import React from "react";
import Head from "next/head";
import Image from "next/image";

const StationPage = async ({ params }: any) => {
  const { name } = await params;

  const trainData = await getDataForStation(name);

  if (
    !trainData ) {
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
        <h1 className="text-2xl font-bold mb-4">Train Schedule for {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
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
          <div className="mb-6">
            <h3 className="text-lg my-5">Forward Trains</h3>
            <div className="w-full overflow-x-auto max-w-full">
              <table className="min-w-max w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train Name
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      From
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Arrival
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Off Day
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination Arrival Time
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.forward_trains.map((train: any) => (
                    <tr key={train.trainNumber} className="border-b">
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_name}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.from}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.offday}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.to}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_destination}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <div className="my-10">
            <h3 className="text-lg my-5">Downwards Trains</h3>
            <div className="w-full overflow-x-auto max-w-full">
              <table className="min-w-max w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train Name
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      From
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Arrival
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Off Day
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination Arrival Time
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.reverse_trains.map((train: any) => (
                    <tr key={train.trainNumber} className="border-b">
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_name}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.from}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.offday}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.to}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_destination}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default StationPage;
