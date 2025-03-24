import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Train Jatri</h3>
            <p className="text-sm text-gray-400">
              Your comprehensive guide to Bangladesh Railway. Find schedules, live tracking, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/schedule-by-train" className="text-sm text-gray-300 hover:text-white">
                  Train Schedules
                </Link>
              </li>
              <li>
                <Link href="/schedule-by-station" className="text-sm text-gray-300 hover:text-white">
                  Station Schedules
                </Link>
              </li>
              <li>
                <Link href="/live-tracking" className="text-sm text-gray-300 hover:text-white">
                  Live Tracking
                </Link>
              </li>
              <li>
                <Link href="/cancellation-refund" className="text-sm text-gray-300 hover:text-white">
                  Cancellation & Refunds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search?from=Dhaka&to=Narsingdi" className="text-sm text-gray-300 hover:text-white">
                  Dhaka to Narsingdi
                </Link>
              </li>
              <li>
                <Link href="/search?from=Dhaka&to=Joydebpur" className="text-sm text-gray-300 hover:text-white">
                  Dhaka to Joydebpur
                </Link>
              </li>
              <li>
                <Link href="/search?from=Chittagong&to=Dhaka" className="text-sm text-gray-300 hover:text-white">
                  Chittagong to Dhaka
                </Link>
              </li>
              <li>
                <Link href="/search?from=Khulna&to=Dhaka" className="text-sm text-gray-300 hover:text-white">
                  Khulna to Dhaka
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@trainjatri.com" className="text-sm text-gray-300 hover:text-white">
                  support@trainjatri.com
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-300">
                  +880 123 456 7890
                </p>
              </li>
              <li>
                <p className="text-sm text-gray-300">
                  123 Railway Road, Dhaka, Bangladesh
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Train Jatri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;