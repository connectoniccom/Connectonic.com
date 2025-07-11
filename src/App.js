import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <button className="open-btn" onClick={toggleSidebar}>
        &#9776;
      </button>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div id="main-content">
        <section id="home" className="content-section">
          <h1>Welcome Home</h1>
          <p>This is the main landing area of our application. Explore the different sections using the sidebar.</p>
          <img src="https://placehold.co/600x400.png" alt="placeholder" data-ai-hint="futuristic city" />
        </section>
        <section id="services" className="content-section">
          <h2>Our Services</h2>
          <p>We offer a wide range of services to meet your needs. Our team is dedicated to providing the highest quality solutions.</p>
          <ul>
            <li>Web Development</li>
            <li>Mobile App Development</li>
            <li>Cloud Solutions</li>
            <li>UI/UX Design</li>
          </ul>
        </section>
        <section id="clients" className="content-section">
          <h2>Our Clients</h2>
          <p>We have had the privilege of working with a diverse range of clients from various industries.</p>
          <p>Our commitment to excellence has allowed us to build long-lasting relationships.</p>
        </section>
        <section id="contact" className="content-section">
          <h2>Contact Us</h2>
          <p>Get in touch with us! We would love to hear from you.</p>
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </section>
      </div>
    </div>
  );
}

export default App;
