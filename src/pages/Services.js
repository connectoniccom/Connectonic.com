import React from 'react';
import './Services.css';

function Services() {
  return (
    <section id="services" className="content-section">
      <div className="services-container">
        <h2>Our Services</h2>
        <p>We offer a wide range of services to meet your needs. Our team is dedicated to providing the highest quality solutions.</p>
        <ul className="services-list">
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>Cloud Solutions</li>
          <li>UI/UX Design</li>
        </ul>
      </div>
    </section>
  );
}

export default Services;
