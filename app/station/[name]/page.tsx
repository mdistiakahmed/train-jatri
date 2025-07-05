import { getDataForStation } from "@/utils/getData";
import React from "react";
import Head from "next/head";
import Image from "next/image";

import { allStationNames } from './../../../data/Stations/0_all_station_name';

export async function generateStaticParams() {
  return allStationNames.map((name: string) => ({
    name: name.split(" ").join("-").toLowerCase(),
  }));
}

export const generateMetadata = async ({ params }: any) => {
   const { name } = await params;
  const trainData = await getDataForStation(name);

  if (!trainData) {
    return {
      title: "Train Details Not Found",
      description: "Train details could not be found.",
    };
  }

  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule`,
    description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
    openGraph: {
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule`,
      description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
      url: `https://www.trainjatri.com/station/${name}`,
      siteName: "Train Jatri",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule`,
      description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
    },
  };
};


const generateForwardTrainDescription = (station: any,  forward_trains: any) => {

  return (
    <div className="bg-white">
      {forward_trains.map((train: any, index: number) => {
        const description = `${train.train_name} (${train.train_number}) departs from ${station} at ${train.departure_time_at_current} (arrives at ${train.arrival_time_at_current}). It reaches its destination, ${train.to}, at ${train.arrival_time_at_destination}.`;

        return (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <p className="text-sm text-gray-700 text-center">{description}</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Offday: {train.offday}
            </p>
          </div>
        );
      })}
    </div>
  );
};


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

  const stationName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="text-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Train Schedule for {stationName} Station</h1>
        <p className="mb-4">
            The {stationName} train schedule provides detailed information to help you plan your rail 
            journey with confidence. Whether you&apos;re a daily commuter, an occasional traveler, 
            or planning a long-distance trip, having access to the latest train schedule from {stationName} is essential.
            This comprehensive timetable includes all scheduled trains that stop at {stationName},
            along with key details such as train numbers, train names, exact arrival and departure times,
            and designated weekly off-days. 
            
            By reviewing the {stationName} train schedule, you can easily find the right train to your destination,
            avoid delays, and ensure a smooth travel experience. 
            Stay informed with accurate and up-to-date data on all forward and return routes connected to {stationName},
            making your travel planning faster, easier, and more reliable.
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
            <h3 className="text-lg my-5">Forward Trains - {stationName} Train Schedule</h3>
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
                      Departure
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
                  {trainData.forward_trains.map((train: any, index: number) => (
                    <tr key={index} className="border-b">
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
                        {train.departure_time_at_current}
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
            <h3 className="text-lg my-5">Downwards Trains - {stationName} Train Schedule</h3>
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
                      Departure
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
                        {train.departure_time_at_current}
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


          <div className="pt-20">
            <h2 className="text-2xl font-bold mb-4">
                {stationName} Station Train Schedule (forward trains)
            </h2>
            {generateForwardTrainDescription(trainData.station, trainData.forward_trains)}
          </div>

          <div className="pt-20">
            <h2 className="text-2xl font-bold mb-4">
                {stationName} Station Train Schedule (Downwards trains)
            </h2>
            {generateForwardTrainDescription(trainData.station, trainData.reverse_trains)}
          </div>
      </div>
    </div>
  );
};

export default StationPage;
