import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Topbar from "@/components/topbar/Topbar";
import Footer from "@/components/footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import AdSense from "@/components/AdSense";
import GoogleAdWithSuspense from "@/components/google-ads/GoogleAd";

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
    images: "/logo.png",
    url: "https://www.trainjatri.com",
    siteName: "Train Jatri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Train Jatri - Bangladesh Railway Schedule & Live Tracking",
    description:
      "Find accurate Bangladesh Railway train schedules, live tracking, ticket information, and more. Plan your journey across Bangladesh with ease. Get real-time updates for all train routes.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense />
      </head>
      <GoogleAnalytics gaId="G-HV8MP6T8X7" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Topbar />

        <div
          className={`flex justify-between bg-[url('/snowflakes.png')] bg-center`}
        >
          <div className="hidden md:block w-1/6 pt-36 md:flex md:justify-center">
            <GoogleAdWithSuspense>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-9851111861096184"
                  data-ad-slot="2756248511"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </GoogleAdWithSuspense>
          </div>
          <main className="flex-1">
            <p className="whitespace-nowrap text-end py-4 text-xs italic mr-4">Last Updated: 21th June, 2025</p>
            {children}
          </main>
          <div className="hidden md:block w-1/6 pt-36 md:flex md:justify-center">
              <GoogleAdWithSuspense>
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-9851111861096184"
                  data-ad-slot="6224720234"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </GoogleAdWithSuspense>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
