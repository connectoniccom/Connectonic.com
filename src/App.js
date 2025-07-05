import React, { useState } from 'react';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="close-btn">&times;</button>
        <div className="sidebar-header">
          <h2>My App</h2>
        </div>
        <ul className="sidebar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <main className="main-content">
        <div onClick={toggleSidebar} className="hamburger-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Welcome!</h1>
        <p>This is the main content area. Select a page from the sidebar.</p>
      </main>
    </div>
  );
}

export default App;
