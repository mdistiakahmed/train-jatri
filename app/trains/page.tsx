import React from "react";
import Link from "next/link";
import Image from "next/image";

const TrainsPage = () => {
  const trainRoutes = {
    "Dhaka-Chattogram": [
      "Mohanogor Provati",
      "Mohanogor Godhuli",
      "Chattala Express",
    ],
    "Dhaka-Noakhali": ["Upakul Express"],
    "Dhaka-Sylhet": [
      "Parabat Express",
      "Jayantika Express",
      "Kalni Express",
      "Upaban Express",
    ],
    "Dhaka-Rajshahi": [
      "Padma Express",
      "Dhumketu Express",
      "Silk City Express",
      "Bonolota Express",
    ],
    "Chattogram-Sylhet": ["Paharika Express", "Udayan Express"],
    "Khulna-Rajshahi": ["Sagordari Express", "Rupsa Express"],
  };

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

        {Object.entries(trainRoutes).map(([route, trains]) => (
          <div key={route} className="mb-12">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 capitalize">
              {route}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trains.map((train) => (
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
