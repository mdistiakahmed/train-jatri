import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Train Tracking - Train Jatri",
  description:
    "Track the real-time location of trains in Bangladesh using SMS. Get live train tracking updates by sending an SMS with the train number or code to 16318.",
  keywords: [
    "live train tracking",
    "train location",
    "Bangladesh train",
    "SMS train tracking",
    "train status",
    "train number",
    "train code",
  ],
  openGraph: {
    title: "Live Train Tracking - Train Jatri",
    description:
      "Track the real-time location of trains in Bangladesh using SMS. Get live train tracking updates by sending an SMS with the train number or code to 16318.",
    type: "website",
    url: "https://www.trainjatri.com/live-tracking", // Replace with your actual page URL
  },
  twitter: {
    title: "Live Train Tracking - Train Jatri",
    description:
      "Track the real-time location of trains in Bangladesh using SMS. Get live train tracking updates by sending an SMS with the train number or code to 16318.",
  },
};

const LiveTrackingPage = () => {
  return (
    <div className="p-4 my-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Live Train Tracking</h1>

      <p className="mb-4 text-lg text-gray-700">
        Stay updated on the real-time location of trains across Bangladesh with
        our live tracking feature. Simply send an SMS with the train number or
        code to get instant updates.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          How to Track a Train via SMS
        </h2>

        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="mb-4">To track a train, follow these simple steps:</p>

          <ol className="list-decimal list-inside mb-4">
            <li className="mb-2">
              <strong>Compose a New SMS:</strong> Open the messaging app on your
              mobile device.
            </li>
            <li className="mb-2">
              <strong>Type the Command:</strong> In the message body, type the
              following command:
              <code className="bg-gray-200 px-2 py-1 rounded mx-1">
                TR &lt;Space&gt; train no/train code
              </code>
              Replace <code>train no/train code</code> with the actual train
              number or code.
            </li>
            <li className="mb-2">
              <strong>Send the SMS:</strong> Send the SMS to the following
              number:
              <code className="bg-gray-200 px-2 py-1 rounded mx-1">16318</code>
            </li>
            <li>
              <strong>Receive the Update:</strong> You will receive a response
              SMS with the current location and status of the train.
            </li>
          </ol>

          <p className="mt-4">
            <strong>Example:</strong> To track train number 701, type:
            <code className="bg-gray-200 px-2 py-1 rounded mx-1">TR 701</code>
            and send it to 16318.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>

        <ul className="list-disc list-inside">
          <li className="mb-2">
            Ensure that you type the command correctly, with a space between
            &quot;TR&quot; and the train number/code.
          </li>
          <li className="mb-2">Standard SMS charges may apply.</li>
          <li>
            The accuracy of the live tracking information depends on the
            availability of real-time data.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default LiveTrackingPage;
