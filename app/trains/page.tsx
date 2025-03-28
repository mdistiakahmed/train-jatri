import React from "react";
import Link from "next/link";
import Image from "next/image";

export const trainRoutes: any = {
  "Dhaka to Tarakandi": ["AGHNIBINA EXPRESS", "JAMUNA EXPRESS"],
  "Tarakandi to Dhaka": ["AGHNIBINA EXPRESS", "JAMUNA EXPRESS"],
  "Dhaka to Chapainawabganj": ["BANALATA EXPRESS"],
  "Chapainawabganj to Dhaka": ["BANALATA EXPRESS"],
  "Rajshahi to Panchagarh": ["BANGLABANDHA EXPRESS"],
  "Panchagarh to Rajshahi": ["BANGLABANDHA EXPRESS"],
  "Rajshahi to Chilahati": ["BARENDRA EXPRESS", "TITUMIR EXPRESS"],
  "Chilahati to Rajshahi": ["BARENDRA EXPRESS", "TITUMIR EXPRESS"],
  "Benapole to Dhaka": ["BENAPOLE EXPRESS", "RUPOSHI BANGLA EXPRESS"],
  "Dhaka to Benapole": ["BENAPOLE EXPRESS", "RUPOSHI BANGLA EXPRESS"],
  "Dhaka to Dewanganj_Bazar": ["BHRAMMAPUTRA EXPRESS", "TISTA EXPRESS"],
  "Dewanganj_Bazar to Dhaka": ["BHRAMMAPUTRA EXPRESS", "TISTA EXPRESS"],
  "Chattogram to Jamalpur_Town": ["BIJOY EXPRESS"],
  "Jamalpur_Town to Chattogram": ["BIJOY EXPRESS"],
  "Lalmonirhat to Burimari": ["BURIMARI COMMUTER"],
  "Burimari to Lalmonirhat": ["BURIMARI COMMUTER"],
  "Dhaka to Burimari": ["BURIMARI EXPRESS"],
  "Lalmonirhat to Dhaka": ["BURIMARI EXPRESS", "LALMONI EXPRESS"],
  "Rajshahi to Chapainawabganj": ["CHAPAINAWABGANJ SHUTTLE"],
  "Chapainawabganj to Rajshahi": ["CHAPAINAWABGANJ SHUTTLE"],
  "Chattogram to Dhaka": [
    "CHATTALA EXPRESS",
    "MOHANAGAR EXPRESS",
    "SONAR BANGLA EXPRESS",
    "SUBORNO EXPRESS",
    "TURNA",
  ],
  "Dhaka to Chattogram": [
    "CHATTALA EXPRESS",
    "MOHANAGAR EXPRESS",
    "SONAR BANGLA EXPRESS",
    "SUBORNO EXPRESS",
    "TURNA",
  ],
  "Dhaka to Chilahati": ["CHILAHATI EXPRESS", "NILSAGAR EXPRESS"],
  "Chilahati to Dhaka": ["CHILAHATI EXPRESS", "NILSAGAR EXPRESS"],
  "Khulna to Dhaka": [
    "CHITRA EXPRESS",
    "JAHANABAD EXPRESS",
    "SUNDARBAN EXPRESS",
  ],
  "Dhaka to Khulna": [
    "CHITRA EXPRESS",
    "JAHANABAD EXPRESS",
    "SUNDARBAN EXPRESS",
  ],
  "Cox's Bazar to Dhaka": ["COXS BAZAR EXPRESS", "PARJOTAK EXPRESS"],
  "Dhaka to Cox's Bazar": ["COXS BAZAR EXPRESS", "PARJOTAK EXPRESS"],
  "Dhalarchar to Rajshahi": ["DHALARCHAR EXPRESS"],
  "Rajshahi to Dhalarchar": ["DHALARCHAR EXPRESS"],
  "Dhaka to Rajshahi": [
    "DHUMKETU EXPRESS",
    "MADHUMATI EXPRESS",
    "PADMA EXPRESS",
    "SILKCITY EXPRESS",
  ],
  "Rajshahi to Dhaka": [
    "DHUMKETU EXPRESS",
    "MADHUMATI EXPRESS",
    "PADMA EXPRESS",
    "SILKCITY EXPRESS",
  ],
  "Santahar to Panchagarh": ["DOLONCHAPA EXPRESS"],
  "Panchagarh to Santahar": ["DOLONCHAPA EXPRESS"],
  "Dhaka to Panchagarh": [
    "DRUTOJAN EXPRESS",
    "EKOTA EXPRESS",
    "PANCHAGARH EXPRESS",
  ],
  "Panchagarh to Dhaka": [
    "DRUTOJAN EXPRESS",
    "EKOTA EXPRESS",
    "PANCHAGARH EXPRESS",
  ],
  "Dhaka to Kishorganj": [
    "EGAROSINDHUR GODHULI",
    "EGAROSINDHUR PROVATI",
    "KISHORGANJ EXPRESS",
  ],
  "Kishorganj to Dhaka": [
    "EGAROSINDHUR GODHULI",
    "EGAROSINDHUR PROVATI",
    "KISHORGANJ EXPRESS",
  ],
  "Dhaka to Mohanganj": ["HAWR EXPRESS", "MOHONGANJ EXPRESS"],
  "Mohanganj to Dhaka": ["HAWR EXPRESS", "MOHONGANJ EXPRESS"],
  "Dhaka to Bhuapur": ["JAMALPUR EXPRESS"],
  "Bhuapur to Dhaka": ["JAMALPUR EXPRESS"],
  "Dhaka to Sylhet": [
    "JAYENTIKA EXPRESS",
    "KALNI EXPRESS",
    "PARABAT EXPRESS",
    "UPABAN EXPRESS",
  ],
  "Sylhet to Dhaka": [
    "JAYENTIKA EXPRESS",
    "KALNI EXPRESS",
    "PARABAT EXPRESS",
    "UPABAN EXPRESS",
  ],
  "Parbatipur to Panchagarh": ["KANCHON INTERCITY COMMUTER"],
  "Panchagarh to Parbatipur": ["KANCHON INTERCITY COMMUTER"],
  "Khulna to Rajshahi": ["KAPOTAKSHA EXPRESS", "SAGARDARI EXPRESS"],
  "Rajshahi to Khulna": ["KAPOTAKSHA EXPRESS", "SAGARDARI EXPRESS"],
  "Santahar to Burimari": ["KOROTOA EXPRESS"],
  "Burimari to Santahar": ["KOROTOA EXPRESS"],
  "Dhaka to Kurigram": ["KURIGRAM EXPRESS"],
  "Kurigram to Dhaka": ["KURIGRAM EXPRESS"],
  "Lalmonirhat to Birol": ["LALMONI COMMUTER"],
  "Birol to Lalmonirhat": ["LALMONI COMMUTER"],
  "Dhaka to Lalmonirhat": ["LALMONI EXPRESS"],
  "Chattogram to Chandpur": ["MEGHNA EXPRESS"],
  "Chandpur to Chattogram": ["MEGHNA EXPRESS"],
  "Chattogram to Sylhet": ["PAHARIKA EXPRESS", "UDAYAN EXPRESS"],
  "Sylhet to Chattogram": ["PAHARIKA EXPRESS", "UDAYAN EXPRESS"],
  "Cox's Bazar to Chattogram": ["PROBAL EXPRESS", "SHAIKAT EXPRESS"],
  "Chattogram to Cox's Bazar": ["PROBAL EXPRESS", "SHAIKAT EXPRESS"],
  "Dhaka to Rangpur": ["RANGPUR EXPRESS"],
  "Rangpur to Dhaka": ["RANGPUR EXPRESS"],
  "Khulna to Chilahati": ["RUPSHA EXPRESS", "SIMANTA EXPRESS"],
  "Chilahati to Khulna": ["RUPSHA EXPRESS", "SIMANTA EXPRESS"],
  "Sirajganj_Bazar to Dhaka": ["SIRAJGANJ EXPRESS"],
  "Dhaka to Sirajganj_Bazar": ["SIRAJGANJ EXPRESS"],
  "Gobra to Rajshahi": ["TUNGIPARA EXPRESS"],
  "Rajshahi to Gobra": ["TUNGIPARA EXPRESS"],
  "Noakhali to Dhaka": ["UPAKUL EXPRESS"],
  "Dhaka to Noakhali": ["UPAKUL EXPRESS"],
};

const TrainsPage = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Trains Schedule
        </h1>

        <p className="text-lg text-gray-600 mb-10 text-center">
          Discover a comprehensive list of trains categorized by routes across
          Bangladesh. Find your train and plan your journey with Train Jatri.
        </p>

        <Image
          src="/logo.png"
          alt="Bangladesh Railway Train Journey"
          width={400}
          height={200}
          className="mx-auto my-8"
        />

        {Object.entries(trainRoutes).map(([route, trains]: any) => (
          <div key={route} className="mb-12">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 capitalize">
              {route}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trains.map((train: any) => (
                <Link
                  key={train}
                  href={`/trains/${train.toLowerCase().replace(/ /g, "-")}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
                    {train}
                  </h3>
                  <p className="text-gray-600">View schedule and details.</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-indigo-600 font-medium">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainsPage;
