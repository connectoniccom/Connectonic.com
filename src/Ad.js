import React, { useEffect } from 'react';

// IMPORTANT: This ID is now correctly set to your AdSense Publisher ID.
const PUBLISHER_ID = "ca-pub-2583060052563516";

function Ad({ adSlot }) {
  useEffect(() => {
    // This effect will run for each Ad component instance.
    try {
      if (typeof window !== "undefined") {
        // Pushing an empty object to adsbygoogle initializes the ad slot.
        // This needs to happen for each ad unit on the page.
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adSlot]); // Re-run the effect if the ad slot ID changes.

  // The main AdSense script is already in index.html, so we don't need a placeholder here.
  // We just render the ad unit markup.
  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot} // Use the specific ad slot ID passed as a prop
        data-ad-format="auto" // "auto" allows AdSense to show various formats
        data-full-width-responsive="true"></ins>
    </div>
  );
}

export default Ad;
