import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { allStationNames } from '../../data/Stations/0_all_station_name';
import SearchStationButton from "@/components/SearchStationComponent";

const StationPage = () => {

  return (
    <div className="p-4 text-center">
      <Head>
        <title>Train Schedule by Station - Train Jatri</title>
        <meta
          name="description"
          content="Find train schedules by station across Bangladesh. Explore detailed schedules for all major stations and plan your journey with ease."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Train Schedule by Station</h1>
      <p className="mb-8 text-lg text-gray-700">
        Explore comprehensive train schedules for stations across Bangladesh.
        Find information on train numbers, names, arrival and departure times,
        and off-days. Plan your journey with ease.
      </p>

      <Image
        src="/logo.png"
        alt="Bangladesh Railway Train Journey"
        width={400}
        height={200}
        className="mx-auto my-8"
      />

      <SearchStationButton />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {allStationNames.map((stationName, index) => (
          <Link
            key={stationName}
            href={`/station/${stationName}`}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-100"
          >
            <div className="flex items-center">
              <div className="ml-4">
                <h3 className="text-md font-medium text-gray-800">
                  {stationName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">View all trains</p>
              </div>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default StationPage;
