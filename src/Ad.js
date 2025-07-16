import React, { useEffect } from 'react';

// IMPORTANT: Replace this with your own Google AdSense Publisher ID
const PUBLISHER_ID = "ca-pub-0000000000000000";

function Ad() {
  const adSlot = "1234567890"; // In a real app, you might want to pass this as a prop

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && PUBLISHER_ID !== "ca-pub-0000000000000000") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  if (!PUBLISHER_ID || PUBLISHER_ID === "ca-pub-0000000000000000") {
    console.warn("Please replace the placeholder Publisher ID in Ad.js with your real Google AdSense Publisher ID.");
    return (
      <div style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', margin: '20px 0' }}>
        <p>Ad Placeholder</p>
        <p style={{ fontSize: '0.8rem', color: '#ccc' }}>To display real ads, get your Publisher ID from Google AdSense and update it in <code>src/Ad.js</code>.</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
}

export default Ad;
