import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>&times;</button>
      <a href="/" onClick={handleLinkClick}>Home</a>
      <a href="#services" onClick={handleLinkClick}>Services</a>
      <a href="#clients" onClick={handleLinkClick}>Clients</a>
      <a href="#contact" onClick={handleLinkClick}>Contact</a>
    </div>
  );
}

export default Sidebar;
