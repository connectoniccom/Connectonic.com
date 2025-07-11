import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleTheme, currentTheme, closeSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <a href="#home" onClick={closeSidebar}>Home</a>
      <a href="#services" onClick={closeSidebar}>Services</a>
      <a href="#clients" onClick={closeSidebar}>Clients</a>
      <a href="#contact" onClick={closeSidebar}>Contact</a>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default Sidebar;
