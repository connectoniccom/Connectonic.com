import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleTheme, currentTheme }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default Sidebar;
