import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar open">
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
    </div>
  );
}

export default Sidebar;
