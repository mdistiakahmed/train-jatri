import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/topbar/Topbar";
import Footer from "@/components/footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Train Jatri - Bangladesh Railway Schedule & Live Tracking",
  description:
    "Find accurate Bangladesh Railway train schedules, live tracking, ticket information, and more. Plan your journey across Bangladesh with ease. Get real-time updates for all train routes.",
  keywords: [
    "Bangladesh Railway",
    "train schedule",
    "train tracking",
    "train tickets",
    "Bangladesh trains",
    "railway information",
    "Dhaka train",
    "Chittagong train",
    "Sylhet train",
    "Khulna train",
    "train jatri",
    "Bangladesh railway schedule",
    "train live tracking Bangladesh",
    "Bangladesh train ticket",
    "railway schedule Bangladesh",
  ],
  openGraph: {
    title: "Train Jatri - Bangladesh Railway Schedule & Live Tracking",
    description:
      "Find accurate Bangladesh Railway train schedules, live tracking, ticket information, and more. Plan your journey across Bangladesh with ease. Get real-time updates for all train routes.",
    images: "/train-jatri.jpg",
    url: "https://www.trainjatri.com",
    siteName: "Train Jatri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Train Jatri - Bangladesh Railway Schedule & Live Tracking",
    description:
      "Find accurate Bangladesh Railway train schedules, live tracking, ticket information, and more. Plan your journey across Bangladesh with ease. Get real-time updates for all train routes.",
    images: ["/train-jatri.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-HV8MP6T8X7" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Topbar />

        <div
          className={`flex justify-between bg-[url('/snowflakes.png')] bg-center`}
        >
          <div className="hidden md:block w-1/6 pt-36"></div>
          <main className="flex-1">
            <p className="whitespace-nowrap text-end py-4 text-xs italic">Last Updated: 21th June, 2025</p>
            {children}
          </main>
          <div className="hidden md:block w-1/6 pt-36"></div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
