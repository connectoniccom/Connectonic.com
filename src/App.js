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
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="hamburger-icon"></span>
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div id="main-content">
        <header className="App-header">
          <h1>Welcome to My App</h1>
          <p>Here is your content.</p>
        </header>
      </div>
    </div>
  );
}

export default App;
