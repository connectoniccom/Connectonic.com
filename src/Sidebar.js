import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const handleLinkClick = () => {
    // Close sidebar when a link is clicked
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <a href="#home" onClick={handleLinkClick}>Home</a>
      <a href="#services" onClick={handleLinkClick}>Services</a>
      <a href="#clients" onClick={handleLinkClick}>Clients</a>
      <a href="#contact" onClick={handleLinkClick}>Contact</a>
    </div>
  );
}

export default Sidebar;
