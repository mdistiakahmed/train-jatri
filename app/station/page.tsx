import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const StationPage = () => {
  const stations = {
    "Chittagong Region": [
      "Chittagong",
      "Feni",
      "Laksham",
      "Noakhali",
      "Comilla"
    ],
    "Dhaka Region": [
      "Dhaka",
      "Narayanganj",
      "Gazipur",
      "Mymensingh",
      "Brahmanbaria"
    ],
    "Sylhet Region": [
      "Sylhet",
      "Sreemangal",
      "Habiganj",
      "Moulvibazar"
    ],
    "Rajshahi Region": [
      "Rajshahi",
      "Natore",
      "Pabna",
      "Sirajganj",
      "Bogra"
    ],
  };

  return (
    <div className="p-4 text-center">
      <Head>
        <title>Train Schedule by Station - Train Jatri</title>
        <meta name="description" content="Find train schedules by station across Bangladesh. Explore detailed schedules for all major stations and plan your journey with ease." />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Train Schedule by Station</h1>
      <p className="mb-8 text-lg text-gray-700">
        Explore comprehensive train schedules for stations across Bangladesh. Find information on train numbers, names, arrival and departure times, and off-days. Plan your journey with ease.
      </p>

      {Object.entries(stations).map(([region, stationList]) => (
        <div key={region} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{region}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stationList.map((station) => (
              <Link key={station} href={`/station/${station.toLowerCase()}`} className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <h3 className="text-lg font-semibold mb-2">{station} Train Schedule</h3>
                <p className="text-sm text-gray-600">View train schedules for {station} station.</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationPage;