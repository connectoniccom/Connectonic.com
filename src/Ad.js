import React from 'react';
import { GoogleAdSense } from "react-google-adsense";

// IMPORTANT: Replace this with your own Google AdSense Publisher ID
const PUBLISHER_ID = "ca-pub-0000000000000000";

function Ad() {
  // In a real app, you might want to pass a specific ad slot ID as a prop
  // For this example, we'll use a placeholder.
  const adSlot = "1234567890"; 

  if (!PUBLISHER_ID || PUBLISHER_ID === "ca-pub-0000000000000000") {
    console.warn("Please replace the placeholder Publisher ID in Ad.js with your real Google AdSense Publisher ID.");
    return (
        <div style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', margin: '20px 0' }}>
            <p>Ad Placeholder</p>
            <p style={{fontSize: '0.8rem', color: '#ccc'}}>To display real ads, get your Publisher ID from Google AdSense and update it in <code>src/Ad.js</code>.</p>
        </div>
    );
  }

  return (
    <div style={{ margin: '20px 0' }}>
        <GoogleAdSense publisherId={PUBLISHER_ID} slotId={adSlot} />
    </div>
  );
}

export default Ad;
