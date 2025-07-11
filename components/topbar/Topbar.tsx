"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const Topbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src="/new_logo.png"
                  alt="Train Jatri Logo"
                  width={80}
                  height={40}
                  className="w-20 h-15 rounded-lg"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/trains"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-900 hover:border-gray-300"
              >
                Trains
              </Link>

              <Link
                href="/station"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-900 hover:border-gray-300"
              >
                Stations
              </Link>
              <Link
                href="/routes"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-900 hover:border-gray-300"
              >
                Routes
              </Link>
              <Link
                href="/places-to-visit"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:text-gray-900 hover:border-gray-300"
              >
                Places to visit
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex items-center">
            <Link
              href="https://eticket.railway.gov.bd/"
              target="_blank"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:text-gray-900 hover:border-gray-300"
            >
              Buy Ticket
            </Link>
            <Link
              href="/live-tracking"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Live Tracking
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } sm:hidden text-center `}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/trains"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-50 hover:text-gray-900"
            onClick={closeMobileMenu}
          >
            Trains
          </Link>
          <Link
            href="/station"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-50 hover:text-gray-900"
            onClick={closeMobileMenu}
          >
            Stations
          </Link>
          <Link
            href="/routes"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-50 hover:text-gray-900"
            onClick={closeMobileMenu}
          >
            Routes
          </Link>
          <Link
            href="/places-to-visit"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-50 hover:text-gray-900"
            onClick={closeMobileMenu}
          >
            Places to visit
          </Link>
          <Link
            href="https://eticket.railway.gov.bd/"
            target="_blank"
            className="block px-3 py-2 rounded-md text-base font-medium  hover:bg-gray-50 hover:text-gray-900"
            onClick={closeMobileMenu}
          >
            Buy Ticket
          </Link>

          <Link
            href="/live-tracking"
            className="block w-full px-4 py-2 mt-2 text-center border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={closeMobileMenu}
          >
            Live Tracking
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
