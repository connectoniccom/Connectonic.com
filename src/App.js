import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div id="main-content" className={isSidebarOpen ? 'sidebar-open' : ''}>
        <header className="App-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <div className="hamburger-icon">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </button>
          <h1>Welcome to My App</h1>
          <p>Click the button in the top left to open the navigation menu.</p>
        </header>
      </div>
    </div>
  );
}

export default App;
