import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Explore Bangladesh by Train with TrainJatri
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Your comprehensive guide to navigating the Bangladesh Railway. Get
            up-to-date schedules, live tracking, and essential travel
            information.
          </p>
          <Image
            src="/logo.png"
            alt="Bangladesh Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto"
          />
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-6">
            Quick Access to Essential Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/trains"
              className="block p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Train Schedules</h3>
              <p className="text-gray-600">
                Find schedules by train name or number.
              </p>
            </Link>
            <Link
              href="/station"
              className="block p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Station Schedules</h3>
              <p className="text-gray-600">
                View schedules for specific stations.
              </p>
            </Link>
            <Link
              href="/places-to-visit"
              className="block p-6 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">Places to visit</h3>
              <p className="text-gray-600">
                Know about beautiful places to visit in Bangladesh.
              </p>
            </Link>
            <Link
              href="/live-tracking"
              className="block p-6 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                Live Train Tracking
              </h3>
              <p className="text-gray-600">
                Track the real-time location of trains.
              </p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">
            Popular Train Routes in Bangladesh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/search?from=Dhaka&to=Narsingdi"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Dhaka to Narsingdi Train Schedule
            </Link>
            <Link
              href="/search?from=Dhaka&to=Joydebpur"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Dhaka to Joydebpur Train Schedule
            </Link>
            <Link
              href="/search?from=Dhaka&to=Brahmanbaria"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Dhaka to Brahmanbaria Train Schedule
            </Link>
            <Link
              href="/search?from=Chittagong&to=Dhaka"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Chittagong to Dhaka Train Schedule
            </Link>
            <Link
              href="/search?from=Khulna&to=Dhaka"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Khulna to Dhaka Train Schedule
            </Link>
            <Link
              href="/search?from=Sylhet&to=Dhaka"
              className="p-4 bg-gray-100 rounded-md hover:bg-gray-200 block text-blue-600 hover:underline"
            >
              Sylhet to Dhaka Train Schedule
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
