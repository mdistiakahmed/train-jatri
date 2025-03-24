import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

const StationPage = () => {
  const stations = {
    "Dhaka to Chattogram Route": [
      "Dhaka",
      "Tejgaon",
      "Dhaka Bimanbandar",
      "Tongi",
      "Pubail",
      "Arikhola",
      "Ghorashal",
      "Jinardi",
      "Narsingdi",
      "Amirganj",
      "Khanabari",
      "Hatubhanga",
      "Srinidi",
      "Daulatkandi",
      "Bhairab Bazar",
      "Brahmanbaria",
      "Paghachang",
      "Bhatshala",
      "Akhaura",
      "Gangasagar",
      "Imambari",
      "Kasba",
      "Mandabag",
      "Saldanodi",
      "Shashidal",
      "Rajapur",
      "Sadar Rasulpur",
      "Cumilla",
      "Mainamati",
      "Lalmai",
      "Alishwar",
      "Laksam",
      "Naoti",
      "Nangolkot",
      "Hasanpur",
      "Gunabati",
      "Sharishadi",
      "Feni",
      "Kalidaha",
      "Fazilpur",
      "Muhurigang",
      "Chinky Astana",
      "Mirsarai",
      "Bortakia",
      "Sitakunda",
      "Barabkunda",
      "Bhatiari",
      "Faujdarhat",
      "Kaibalyadham",
      "Pahartali",
      "Battali",
      "Chattogram"
    ],
    "Dhaka to Mymensingh Route": [
      "Upcoming",
    ],
    "Dhaka to Sylhet Route": [
      "Upcoming",
    ],
    "Dhaka to Noakhali Route": [
      "Upcoming",
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

      <Image
            src="/logo.PNG"
            alt="Bangladesh Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto my-8"
          />

      {Object.entries(stations).map(([region, stationList]) => (
        <div key={region} className="mb-8 text-center align-center">
          <h2 className="text-2xl font-semibold mb-4">
            {region.split(' ')[0]} <span className="text-xl">→</span> {region.split(' ')[2]} Route
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {stationList.map((station) => (
              <Link key={station} href={`/station/${station.toLowerCase()}`} className="block p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                <h3 className="text-md font-semibold mb-2">{station} Train Schedule</h3>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationPage;