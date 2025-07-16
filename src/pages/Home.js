import React from 'react';
import Ad from '../Ad';

function Home() {
  return (
    <section id="home" className="content-section">
      <h1>Welcome Home</h1>
      <p>This is the main landing area of our application. Explore the different sections using the sidebar.</p>
      
      {/* First Ad Slot */}
      <div style={{ margin: '40px 0' }}>
        <Ad adSlot="1234567890" />
      </div>

      <img src="https://placehold.co/600x400.png" alt="placeholder" data-ai-hint="futuristic city" />

      {/* Second Ad Slot */}
      <div style={{ margin: '40px 0' }}>
        <p>A second ad could appear here.</p>
        <Ad adSlot="0987654321" />
      </div>
    </section>
  );
}

export default Home;
