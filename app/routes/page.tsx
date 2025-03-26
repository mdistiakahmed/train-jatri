import React from "react";
import Link from "next/link";
import Image from "next/image";

const SchedulePage = () => {
  const routes = {
    "Dhaka to Chattogram Route": [
      "Dhaka to Brahmanbaria Train Schedule",
      "Brahmanbaria to Dhaka Train Schedule",
      "Dhaka to Akhaura Train Schedule",
      "Dhaka to Cumilla Train Schedule",
      "Dhaka to Feni Train Schedule",
      "Dhaka to Chattogram Train Schedule",
    ],
    "Dhaka to Sylhet Route": [
      "Dhaka to Habiganj Train Schedule",
      "Dhaka to Sreemangal Train Schedule",
      "Dhaka to Sylhet Train Schedule",
    ],
    "Dhaka to Rajshahi Route": [
      "Dhaka to Natore Train Schedule",
      "Dhaka to Rajshahi Train Schedule",
      "Dhaka to Ishwardi Train Schedule",
    ],
    "Chattogram to Sylhet Route": [
      "Chattogram to Akhaura Train Schedule",
      "Chattogram to Sylhet Train Schedule",
    ],
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Explore Train Routes
        </h1>

        <p className="text-lg text-gray-700 mb-10 text-center">
          Plan your travel with ease. Find comprehensive train schedules for
          popular routes across Bangladesh.
        </p>

        <Image
          src="/logo.png"
          alt="Bangladesh Railway Train Journey"
          width={400}
          height={200}
          className="mx-auto my-8"
        />

        {Object.entries(routes).map(([route, schedules]) => {
          const words = route.split(" ");
          const from = words[0];
          const to = words[2];

          return (
            <div key={route} className="mb-12">
              <h2 className="text-3xl font-semibold text-indigo-700 mb-6 flex items-center justify-center">
                {from} <span className="text-xl mx-2">→</span> {to}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedules.map((schedule) => (
                  <Link
                    key={schedule}
                    href={`/routes/${schedule
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {schedule}
                    </h3>
                    <p className="text-gray-600">
                      View detailed schedule for this route.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <span className="text-indigo-600 font-medium">
                        View Schedule →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchedulePage;
