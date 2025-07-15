import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar, installPrompt, onInstall }) {
  const handleLinkClick = () => {
    if (isOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>&times;</button>
      <Link to="/" onClick={handleLinkClick}>Home</Link>
      <Link to="/services" onClick={handleLinkClick}>Services</Link>
      <Link to="/clients" onClick={handleLinkClick}>Clients</Link>
      <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
      {installPrompt && (
        <button className="install-btn" onClick={onInstall}>
          Install App
        </button>
      )}
    </div>
  );
}

export default Sidebar;
