import React from 'react';
import Ad from '../Ad';

function Home() {
  return (
    <section id="home" className="content-section">
      <h1>Welcome Home</h1>
      <p>This is the main landing area of our application. Explore the different sections using the sidebar.</p>
      <img src="https://placehold.co/600x400.png" alt="placeholder" data-ai-hint="futuristic city" />

      {/* Example Ad */}
      <div style={{ margin: '40px 0' }}>
        <Ad />
      </div>
    </section>
  );
}

export default Home;
