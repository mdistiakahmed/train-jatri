import React from 'react';
import type { Metadata } from 'next';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Dhaka Metro Rail Schedule & Timings | Train Jatri',
  description: 'Complete Dhaka Metro Rail schedule and timings for Uttara North to Motijheel route. Check first and last train departure times, weekday, Friday, weekend and government holiday schedules with frequency details.',
  keywords: 'metro rail schedule, dhaka metro rail, uttara to motijheel, metro rail timings, dhaka mrt, bangladesh metro rail, dhaka metro rail first train, dhaka metro rail last train',
  openGraph: {
    title: 'Dhaka Metro Rail Schedule & Timings | Train Jatri',
    description: 'Dhaka Metro Rail schedule for Uttara North to Motijheel with first and last train times, weekday, Friday, weekend and holiday timings. Updated metro rail timings with frequency information.',
    type: 'website',
    images: "/metro.png",
    url: "https://www.trainjatri.com/metro-rail",
    siteName: "Train Jatri",
  },
};

const ScheduleCard = ({ title, schedule }: { title: string; schedule: { from: string; to: string; first: string; last: string }[] }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
    <h3 className="bg-indigo-600 text-white text-lg font-semibold px-4 py-3">{title}</h3>
    <div className="p-4">
      {schedule.map((item, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-md">
            <div className="text-center md:text-left mb-3 md:mb-0">
              <div className="font-medium text-gray-900">{item.from}</div>
              <div className="text-indigo-500 my-1">↓</div>
              <div className="font-medium text-gray-900">{item.to}</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-8 text-center sm:text-left mt-3 md:mt-0">
              <div className="mb-2 sm:mb-0">
                <div className="text-sm text-gray-500">First Train</div>
                <div className="text-lg font-semibold text-indigo-600">{item.first}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Train</div>
                <div className="text-lg font-semibold text-indigo-600">{item.last}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const schedules = [
  {
    id: 'weekday',
    title: '📅 Weekday Schedule (রবিবার to বৃহস্পতিবার)',
    items: [
      {
        from: 'Uttara North (উত্তরা উত্তর)',
        to: 'Motijheel (মতিঝিল)',
        first: '7:10 AM',
        last: '9:00 PM'
      },
      {
        from: 'Motijheel (মতিঝিল)',
        to: 'Uttara North (উত্তরা উত্তর)',
        first: '7:30 AM',
        last: '9:40 PM'
      }
    ]
  },
  {
    id: 'friday',
    title: '🕌 Friday Schedule (শুক্রবার)',
    items: [
      {
        from: 'Uttara North (উত্তরা উত্তর)',
        to: 'Motijheel (মতিঝিল)',
        first: '3:00 PM',
        last: '9:00 PM'
      },
      {
        from: 'Motijheel (মতিঝিল)',
        to: 'Uttara North (উত্তরা উত্তর)',
        first: '3:20 PM',
        last: '9:40 PM'
      }
    ]
  },
  {
    id: 'weekend',
    title: '🎉 Weekend & Government Holiday Schedule (শনিবার এবং অন্যান্য সরকারি ছুটি)',
    items: [
      {
        from: 'Uttara North (উত্তরা উত্তর)',
        to: 'Motijheel (মতিঝিল)',
        first: '7:10 AM',
        last: '9:00 PM'
      },
      {
        from: 'Motijheel (মতিঝিল)',
        to: 'Uttara North (উত্তরা উত্তর)',
        first: '7:30 AM',
        last: '9:40 PM'
      }
    ]
  }
];

// Text summary of all schedules for SEO
const textSchedule = {
  weekday: {
    title: 'Weekday Schedule (Sunday to Thursday)',
    northToMotijheel: 'The first train from Uttara North to Motijheel departs at 7:10 AM, and the last train leaves at 9:00 PM.',
    motijheelToNorth: 'From Motijheel to Uttara North, the first departure is at 7:30 AM, while the last service runs at 9:40 PM.'
  },
  friday: {
    title: 'Friday Schedule',
    northToMotijheel: 'On Fridays, the first train from Uttara North to Motijheel starts at 3:00 PM, with the last train leaving at 9:00 PM.',
    motijheelToNorth: 'From Motijheel, the first departure is at 3:20 PM, and the last train departs at 9:40 PM.'
  },
  weekend: {
    title: 'Weekend & Holiday Schedule',
    northToMotijheel: 'On weekends and public holidays, the first train from Uttara North to Motijheel leaves at 7:10 AM, with the last departure at 9:00 PM.',
    motijheelToNorth: 'From Motijheel to Uttara North, the first train starts at 7:30 AM and the last service departs at 9:40 PM.'
  }
};

export default function MetroRailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-8 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Dhaka Metro Rail Schedule
          </h1>
          
          {/* Summary Section */}
          <div className="max-w-3xl mx-auto text-gray-700 text-lg ">
            <p className="mb-4">
              The Dhaka Metro Rail connects <strong>Uttara North</strong> to <strong>Motijheel</strong>, providing fast and reliable service for commuters. The metro operates daily with different schedules for weekdays, Fridays, and weekends or government holidays.
            </p>
            <p className="mb-4">
              On <strong>weekdays (Sunday to Thursday)</strong>, the first train from Uttara North starts at 7:10 AM and the last train departs at 9:00 PM. From Motijheel, services begin at 7:30 AM with the last train at 9:40 PM. 
            </p>
            <p className="mb-4">
              On <strong>Fridays</strong>, metro rail services operate in the afternoon, starting from 3:00 PM and running until 9:40 PM. On <strong>weekends and public holidays</strong>, the schedule follows weekday timings.
            </p>
            <p>
              Trains generally run every 10 minutes during peak hours (8:00 AM – 11:00 AM, 5:00 PM – 8:00 PM) and every 15 minutes during off-peak times, ensuring convenience for passengers.
            </p>
          </div>
        </div>

        {/* All Schedules */}
        <div className="space-y-8 mb-12">
          {schedules.map((schedule) => (
            <div key={schedule.id} id={schedule.id}>
              <ScheduleCard 
                title={schedule.title}
                schedule={schedule.items}
              />
            </div>
          ))}
        </div>

        {/* Text Schedule for SEO */}
        <div className="prose max-w-none bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Dhaka Metro Rail Schedule</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{textSchedule.weekday.title}</h3>
          <p>
            {textSchedule.weekday.northToMotijheel} {textSchedule.weekday.motijheelToNorth} This schedule is followed from Sunday to Thursday, providing consistent timings for office-goers and students.
          </p>
          
          <h3 className="mt-4 text-xl font-semibold text-gray-800 mt-6 mb-3">{textSchedule.friday.title}</h3>
          <p>
            {textSchedule.friday.northToMotijheel} {textSchedule.friday.motijheelToNorth} Friday services start later to accommodate weekly holidays in Bangladesh.
          </p>
          
          <h3 className="mt-4 text-xl font-semibold text-gray-800 mt-6 mb-3">{textSchedule.weekend.title}</h3>
          <p>
            {textSchedule.weekend.northToMotijheel} {textSchedule.weekend.motijheelToNorth} This makes weekend and government holiday travel easier for passengers visiting Motijheel, Uttara, and other important metro rail stations.
          </p>
          
          <h3 className="mt-4 text-xl font-semibold text-gray-800 mt-8 mb-3">About Dhaka Metro Rail</h3>
          <p>
            The <strong>Dhaka Metro Rail</strong> (MRT Line-6) is Bangladesh’s first metro rail service, designed to reduce traffic congestion and provide a modern, efficient, and environment-friendly transport system. Covering the key route between Uttara North and Motijheel, it has become one of the most reliable public transportation systems in Dhaka city.
          </p>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Important Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">General Guidelines</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Arrive at least 15 minutes before the last train departure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Ticket counters close 5 minutes before the last train</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Frequency: Every 10 minutes (peak hours), 15 minutes (off-peak)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Peak Hours</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Morning: 8:00 AM - 11:00 AM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Evening: 5:00 PM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Dhaka Metro Rail schedules may change during public holidays and special occasions. Please check for official updates before your journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official Updates Section */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-10">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">
            Official Metro Rail Schedule Updates
        </h2>
        <p className="text-gray-700 leading-relaxed">
            For the latest and most accurate Dhaka Metro Rail schedule or any urgent
            updates, please visit the{" "}
            <a
            href="https://dmtcl.gov.bd/site/page/d95a6907-4278-4a36-8a90-ee38c2dd43e8/%E0%A6%B8%E0%A6%AE%E0%A7%9F%E0%A6%B8%E0%A7%82%E0%A6%9A%E0%A6%BF"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline font-medium"
            >
            official DMTCL website
            </a>
            . This ensures you always have the most up-to-date metro rail timings and
            announcements.
        </p>
        </section>

      </div>
    </div>
  );
}
