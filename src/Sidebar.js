import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/" onClick={handleLinkClick}>Home</Link>
      <Link to="/artists" onClick={handleLinkClick}>Artists</Link>
    </div>
  );
}

export default Sidebar;
