import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Train Jatri</h3>
            <p className="text-sm text-gray-400">
              Your comprehensive guide to Bangladesh Railway. Find schedules,
              live tracking, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trains"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Train Schedules
                </Link>
              </li>
              <li>
                <Link
                  href="/station"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Station Schedules
                </Link>
              </li>
              <li>
                <Link
                  href="/live-tracking"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Live Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/places-to-visit"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Places to visit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/routes/dhaka-to-quasba-train-schedule"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Dhaka to Quasba
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/dhaka-to-brahmanbaria-train-schedule"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Dhaka to Brahmanbaria
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/dhaka-to-joydebpur-train-schedule"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Dhaka to Joydebpur
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/dhaka-to-cumilla-train-schedule"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Dhaka to Cumilla
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:randzyx62@gmail.com"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  randzyx62@gmail.com
                </a>
              </li>
              {/* <li>
                <p className="text-sm text-gray-300">+880 1988 039480</p>
              </li> */}
              <li>
                <p className="text-sm text-gray-300">
                  Laksam Road, Cumilla, Bangladesh
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Train Jatri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
