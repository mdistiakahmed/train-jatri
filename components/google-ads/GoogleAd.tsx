"use client";
import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
  children?: ReactNode;
};

declare global {
  interface Window {
    adsbygoogle?: any | any[];
  }
}

interface AdSizeWithWidthHeight {
  width: number;
  height: number;
}

const FIXED_AD_SLOT_ID_BY_NAME: Record<string, string> = {
  'ad-slot-1': '1301835385', // Desktop
  'ad-slot-2': '5160101609'  // Mobile
};

const ADSENSE_CLIENT_ID = "ca-pub-9851111861096184";
const isLocalEnv = process.env.NODE_ENV === 'development';


const GoogleAd = ({ children }: Props) => {

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);


  const adSlotNo = '1301835385';
  const height = `400px`;
  const width = `100%`;

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maxHeight: '400px',
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0',
      }}
    >
      {isLocalEnv && (
        <div style={{ width, height, textAlign: 'center', border: '1px solid red', padding: '10px' }}>
           Dimension: <b>{width} x {height}</b>
        </div>
      )}

      {!isLocalEnv && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={adSlotNo}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}

      {children}
    </div>
  );
};

export default GoogleAd;
