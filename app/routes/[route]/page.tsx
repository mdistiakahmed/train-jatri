import React from "react";
import { getDataForRoute } from "@/utils/getData";
import LiveTrackButton from "@/components/LiveTrackButton";
import { paths } from "@/utils/trainRoutes";

export async function generateStaticParams() {
  const routes = paths;
  return routes.map((route) => ({
    route: route.from + "-to-" + route.to + "-train-schedule",
  }));
}

export const generateMetadata = async ({ params }: any) => {
  const { route } = await params;
  const words = route.split("-");
  const sourceCity = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const destinationCity = words[2].charAt(0).toUpperCase() + words[2].slice(1);
  const routeData = await getDataForRoute(
    words.slice(0, words.length - 2).join("-")
  );

  if (!routeData?.trainData) {
    return {
      title: `Train Schedule: ${sourceCity} to ${destinationCity} - Route Not Found`,
      description: `Train schedule from ${sourceCity} to ${destinationCity} is not available.`,
    };
  }

  return {
    title: `Train Schedule: ${sourceCity} to ${destinationCity}`,
    description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days.`,
    openGraph: {
      title: `Train Schedule: ${sourceCity} to ${destinationCity}`,
      description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days.`,
      url: `https://www.trainjatri.com/routes/${route}`,
      siteName: "Train Jatri",
      type: "website",
      images: "/train-jatri.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: `Train Schedule: ${sourceCity} to ${destinationCity}`,
      description: `Train schedule from ${sourceCity} to ${destinationCity}. Check departure, arrival times, and off days.`,
      images: ["/train-jatri.jpg"],
    },
  };
};

const Page = async ({ params }: any) => {
  const { route } = await params;
  const words = route.split("-");
  const routeData = await getDataForRoute(
    words.slice(0, words.length - 2).join("-")
  );

  if (!routeData?.trainData) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-gray-700 text-center">
          <p className="text-lg mb-4">
            Train schedule information for {route} route is not available.
          </p>
        </div>
      </div>
    );
  }

  const sourceCity = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const destinationCity = words[words.length - 3].charAt(0).toUpperCase() + words[words.length - 3].slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          {sourceCity} to {destinationCity} Train Schedule
        </h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {routeData.trainData.length} Trains Available
              </h2>
              <p className="text-gray-700">
                There are currently <span className="font-medium">{routeData.trainData.length} intercity trains</span> operating on the {sourceCity} to {destinationCity} route. 
                Check the schedule below for detailed departure and arrival times. 
                <span className="block mt-1 font-medium">
                  Please note the weekly off day for each train to plan your journey accordingly.
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4 mb-8">
          {routeData.trainData.map((train: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{train.train_name}</h3>
                  <p className="text-sm text-gray-600">Train No: {train.train_model}</p>
                </div>
                <LiveTrackButton
                  trainName={train.train_name}
                  trainNumber={train.train_model}
                  fromStation={train.origin_city_name}
                  toStation={train.destination_city_name}
                />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="font-medium">{train.departure_date_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrival</p>
                  <p className="font-medium">{train.arrival_date_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{train.travel_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Off Day</p>
                  <p className="font-medium">{train.off_day}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Train
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Off Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routeData.trainData.map((train: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {train.train_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {train.train_model}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {train.departure_date_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {train.arrival_date_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {train.travel_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {train.off_day}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <LiveTrackButton
                        trainName={train.train_name}
                        trainNumber={train.train_model}
                        fromStation={train.origin_city_name}
                        toStation={train.destination_city_name}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Train Schedule Text Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{sourceCity} To {destinationCity} Train Schedule Details</h2>
          <div className="space-y-4">
            {routeData.trainData.map((train: any, index: number) => {
              const source = train.origin_city_name.charAt(0).toUpperCase() + train.origin_city_name.slice(1);
              const destination = train.destination_city_name.charAt(0).toUpperCase() + train.destination_city_name.slice(1);
              const offDayText = train.off_day.includes("No OffDay") 
                ? " This train runs every day of the week." 
                : ` This train does not run on ${train.off_day}.`;
              
              return (
                <p key={index} className="text-gray-700">
                  <span className="font-semibold">{train.train_name}</span> (Train No: {train.train_model}) 
                  departs from {source} at {train.departure_date_time} and arrives in {destination} at {train.arrival_date_time}. 
                  The total journey time is {train.travel_time}.{offDayText}
                </p>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">About This Route</h2>
          <p className="text-gray-700">
            This page provides the train schedule for trains traveling from {sourceCity} to {destinationCity}.
            You can find information about train departure times, arrival times, durations, and off days.
            There are {routeData.trainData.length} trains available on this route.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
