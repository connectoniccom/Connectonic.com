import React, { useEffect } from 'react';

// IMPORTANT: Replace this with your own Google AdSense Publisher ID
const PUBLISHER_ID = "ca-pub-2583060052563516";

function Ad({ adSlot }) {
  useEffect(() => {
    try {
      // We only want to push the ad script once, even if we have multiple ads.
      if (typeof window !== "undefined" && PUBLISHER_ID !== "ca-pub-0000000000000000") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adSlot]); // Re-run if the ad slot changes

  // If the publisher ID is the placeholder, show a helpful message.
  if (!PUBLISHER_ID || PUBLISHER_ID === "ca-pub-0000000000000000") {
    console.warn("Please replace the placeholder Publisher ID in Ad.js with your real Google AdSense Publisher ID.");
    return (
      <div style={{ background: '#333', color: 'white', padding: '20px', textAlign: 'center', borderRadius: '8px', margin: '20px 0' }}>
        <p>Ad Placeholder (Slot: {adSlot || 'Default'})</p>
        <p style={{ fontSize: '0.8rem', color: '#ccc' }}>
          To display real ads, get your Publisher ID and Ad Slot IDs from your Google AdSense account.
          Update the PUBLISHER_ID in <code>src/Ad.js</code> and pass the adSlot prop where you use the component.
          You can create different ad units (e.g., display, in-feed, video) in AdSense and use their unique slot IDs here.
        </p>
      </div>
    );
  }

  // Render the actual ad unit.
  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot} // Use the specific ad slot ID passed as a prop
        data-ad-format="auto" // "auto" allows AdSense to show various formats (display, video, etc.)
        data-full-width-responsive="true"></ins>
    </div>
  );
}

export default Ad;
