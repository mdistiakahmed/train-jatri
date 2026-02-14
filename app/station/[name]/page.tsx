import { getDataForStation } from "@/utils/getData";
import React from "react";
import Head from "next/head";
import Image from "next/image";

import { allStationNames } from './../../../data/Stations/0_all_station_name';

const JsonLdStructuredData = ({ stationName, trainData }: any) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${stationName} Station Train Schedule`,
    description: `Complete train schedule for ${stationName} railway station in Bangladesh`,
    url: `https://www.trainjatri.com/station/${stationName.toLowerCase()}`,
    about: {
      "@type": "TrainStation",
      name: `${stationName} Railway Station`,
      address: {
        "@type": "PostalAddress",
        addressCountry: "BD",
        addressLocality: stationName
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export async function generateStaticParams() {
  return allStationNames.map((name: string) => ({
    name: name.split(" ").join("-").toLowerCase(),
  }));
}

export const generateMetadata = async ({ params }: any) => {
   const { name } = await params;
  const trainData = await getDataForStation(name);

  if (!trainData) {
    return {
      title: "Train Details Not Found",
      description: "Train details could not be found.",
    };
  }

  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule in Bangladesh`,
    description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
    openGraph: {
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule in Bangladesh`,
      description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
      url: `https://www.trainjatri.com/station/${name}`,
      siteName: "Train Jatri",
      type: "website",
      images: "/logo.png",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name.charAt(0).toUpperCase() + name.slice(1)} Station Train Schedule`,
      description: `Details of ${name} station train time schedule , weekly offday , source and destination arrival time.`,
      images: "/logo.png",
    },
  };
};


const generateForwardTrainDescription = (station: any,  forward_trains: any) => {

  return (
    <div className="bg-white">
      {forward_trains.map((train: any, index: number) => {
        const description = `${train.train_name} (${train.train_number}) departs from ${station} at ${train.departure_time_at_current} (arrives at ${train.arrival_time_at_current}). It reaches its destination, ${train.to}, at ${train.arrival_time_at_destination}.`;

        return (
          <div key={index} className="mb-4 p-4 border rounded shadow-sm">
            <p className="text-sm text-gray-700 text-center">{description}</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Offday: {train.offday}
            </p>
          </div>
        );
      })}
    </div>
  );
};

// Add this component before the GroupedTrainSchedules component
const TableOfContents = ({ groupedRoutes, stationName }: { groupedRoutes: { [key: string]: any[] }; stationName: string }) => {
  const sortedRoutes = Object.keys(groupedRoutes).sort();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">Table of Contents</h2>
      <div className="grid grid-cols-1 gap-2">
        {/* Add link to all stations table */}
        <a
          key="all-stations"
          href="#forward-trains"
          className="block text-left px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-200 font-semibold"
        >
          {stationName} to All Station Train Schedule
        </a>
        {sortedRoutes.map((route) => (
          <a
            key={route}
            href={`#${route.replace(/\s+/g, '-')}`}
            className="block text-left px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-200"
          >
            {route} Train Schedule
          </a>
        ))}
      </div>
    </div>
  );
};

const groupTrainsByDestination = (trainData: any, currentStation: string) => {
  const groupedRoutes: { [key: string]: any[] } = {};
  
  // Process forward trains
  trainData.forward_trains.forEach((train: any) => {
    const routeKey = `${currentStation} to ${train.to}`;
    
    if (!groupedRoutes[routeKey]) {
      groupedRoutes[routeKey] = [];
    }
    
    groupedRoutes[routeKey].push(train);
  });
  
  // Process reverse trains
  trainData.reverse_trains.forEach((train: any) => {
    const routeKey = `${currentStation} to ${train.to}`;
    
    if (!groupedRoutes[routeKey]) {
      groupedRoutes[routeKey] = [];
    }
    
    groupedRoutes[routeKey].push(train);
  });
  
  // Sort each group by departure time
  Object.keys(groupedRoutes).forEach(route => {
  groupedRoutes[route].sort((a, b) => {
      const convertToMinutes = (time: string) => {
        const [timePart, modifier] = time.trim().split(" "); // "02:10 am"
        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier.toLowerCase() === "pm" && hours !== 12) {
          hours += 12;
        }

        if (modifier.toLowerCase() === "am" && hours === 12) {
          hours = 0;
        }

        return hours * 60 + minutes; // total minutes since midnight
      };

      return convertToMinutes(a.departure_time_at_current) -
            convertToMinutes(b.departure_time_at_current);
    });
  });

  
  return groupedRoutes;
};
// Component to display grouped schedules
const GroupedTrainSchedules = ({groupedRoutes}: {groupedRoutes: { [key: string]: any[] }}) => {
  
  const generateRouteDescription = (route: string, trains: any[]) => {
    const [from, to] = route.split(' to ');
    
    if (trains.length === 0) return '';
    
    const trainDescriptions = trains.map(train => 
      `${train.train_name} departs from ${from} at ${train.departure_time_at_current} and arrive at ${train.arrival_time_at_destination}.`
    );
    
    return (
      <div className="mb-4 text-sm text-gray-600 text-left">
        <p className="mb-3">
          There are total {trains.length} trains departs from {from} to {to}. {trainDescriptions.join(' ')}
        </p>
        <p>
          Find complete schedule information for all trains running from {from} to {to}, including departure times, arrival times, and weekly off days.
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedRoutes).map(([route, trains]) => (
        <div 
          key={route} 
          id={route.replace(/\s+/g, '-')}
          className="bg-white rounded-lg shadow-md p-6 scroll-mt-20"
        >
          <h3 className="text-xl font-bold mb-4 text-center">{route} Train Schedule</h3>

           {/* Add dynamic SEO text */}
          {generateRouteDescription(route, trains)}

          <div className="w-full overflow-x-auto">
            <table className="min-w-max w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">Train Name</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">Train No.</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">From</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">To</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">Arrival</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">Departure</th>
                  <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">Off Day</th>
                </tr>
              </thead>
              <tbody>
                {trains.map((train: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.train_name}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.train_number}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.from}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.to}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.arrival_time_at_current}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.departure_time_at_current}</td>
                    <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">{train.offday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};


const StationPage = async ({ params }: any) => {
  const { name } = await params;

  const trainData = await getDataForStation(name);

  if (
    !trainData ) {
    return (
      <div className="p-4">
        <Head>
          <title>{name} Train Schedule - Train Jatri</title>
          <meta
            name="description"
            content={`Train schedule information for ${name} station. No data available.`}
          />
        </Head>
        Station data not found.
      </div>
    );
  }

  const stationName = name.charAt(0).toUpperCase() + name.slice(1);
  const groupedRoutes = groupTrainsByDestination(trainData, stationName);

  return (
    <div className="text-center">
      <JsonLdStructuredData stationName={stationName} trainData={trainData} />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{stationName} Railway Station Train Schedule</h1>
        <p className="mb-4">
            The {stationName} train schedule provides detailed information to help you plan your rail 
            journey with confidence. Whether you&apos;re a daily commuter, an occasional traveler, 
            or planning a long-distance trip, having access to the latest train schedule from {stationName} is essential.
            This comprehensive timetable includes all scheduled trains that stop at {stationName},
            along with key details such as train numbers, train names, exact arrival and departure times,
            and designated weekly off-days. 
            
            By reviewing the {stationName} train schedule, you can easily find the right train to your destination,
            avoid delays, and ensure a smooth travel experience. 
            Stay informed with accurate and up-to-date data on all forward and return routes connected to {stationName},
            making your travel planning faster, easier, and more reliable.
        </p>

        {/* Add Table of Contents */}
        <div className="w-full overflow-x-auto max-w-screen p-4">
          <TableOfContents groupedRoutes={groupedRoutes} stationName={stationName}/>
        </div>

        <Image
            src="/logo.png"
            alt="Bangladesh Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto my-8"
          />
      </div>

      <div className="w-full overflow-x-auto max-w-screen p-4">
          <div className="mb-6" id="forward-trains">
            <h3 className="text-lg my-5">Forward Trains - {stationName} Train Schedule</h3>
            <div className="w-full overflow-x-auto max-w-full">
              <table className="min-w-max w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train Name
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      From
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Arrival
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Departure
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Off Day
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination Arrival Time
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.forward_trains.map((train: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_name}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.from}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.departure_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.offday}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.to}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_destination}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <div className="my-10">
            <h3 className="text-lg my-5">Downwards Trains - {stationName} Train Schedule</h3>
            <div className="w-full overflow-x-auto max-w-full">
              <table className="min-w-max w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train Name
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      From
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Arrival
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Departure
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Off Day
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Destination Arrival Time
                    </th>
                    <th className="py-2 px-4 border-b text-xs sm:text-sm whitespace-nowrap">
                      Train No.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.reverse_trains.map((train: any) => (
                    <tr key={train.trainNumber} className="border-b">
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_name}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.from}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.departure_time_at_current}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.offday}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.to}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.arrival_time_at_destination}
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm whitespace-nowrap">
                        {train.train_number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          <div className="pt-20">
            <h2 className="text-2xl font-bold mb-4">
                {stationName} Station Train Schedule (forward trains)
            </h2>
            {generateForwardTrainDescription(trainData.station, trainData.forward_trains)}
          </div>

          <div className="pt-20">
            <h2 className="text-2xl font-bold mb-4">
                {stationName} Station Train Schedule (Downwards trains)
            </h2>
            {generateForwardTrainDescription(trainData.station, trainData.reverse_trains)}
          </div>
      </div>

      {/* Add grouped schedules */}
      <div className="w-full overflow-x-auto max-w-screen p-4">
        <GroupedTrainSchedules groupedRoutes={groupedRoutes} />
      </div>
    </div>
  );
};

export default StationPage;
