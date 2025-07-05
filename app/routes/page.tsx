import React from "react";
import Link from "next/link";
import Image from "next/image";

const paths = [
  { from: "Dhaka", to: "Quasba" },
  { from: "Quasba", to: "Dhaka" },
  { from: "Dhaka", to: "Cumilla" },
  { from: "Cumilla", to: "Dhaka" },
  { from: "Dhaka", to: "Brahmanbaria" },
  { from: "Brahmanbaria", to: "Dhaka" },
  { from: "Dhaka", to: "Narsingdi" },
  { from: "Narsingdi", to: "Dhaka" },
  { from: "Dhaka", to: "Mymensingh" },
  { from: "Mymensingh", to: "Dhaka" },
  { from: "Dhaka", to: "Joydebpur" },
  { from: "Joydebpur", to: "Dhaka" },
  { from: "Dhaka", to: "Jamalpur_Town" },
  { from: "Jamalpur_Town", to: "Dhaka" },
  { from: "Dhaka", to: "Akhaura" },
  { from: "Akhaura", to: "Dhaka" },
  { from: "Dhaka", to: "Sylhet" },
  { from: "Sylhet", to: "Dhaka" },
  // Add more routes as needed
];

const SchedulePage = () => {
  const routeItems = paths.map(path => ({
    title: `${path.from} to ${path.to} Train Schedule`,
    from: path.from,
    to: path.to
  }));

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routeItems.map((item) => (
            <Link
              key={item.title}
              href={`/routes/${item.title.toLowerCase().replace(/ /g, "-")}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-md font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <div className="mt-4 flex justify-end">
                <span className="text-indigo-600 font-medium">
                  View Schedule →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SchedulePage;
