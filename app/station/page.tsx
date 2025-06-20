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

      {allStationNames.map((stationName, index) => (
        <div key={index} className="mb-8 text-center align-center">
          <div className="grid grid-cols-1 gap-4">
              <Link
                key={stationName}
                href={`/station/${stationName}`}
                className="block p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <h3 className="text-md font-semibold mb-2">
                  {stationName} train schedule
                </h3>
              </Link>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationPage;
