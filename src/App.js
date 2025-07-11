import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <div className="slash"></div>
        <div className="slash"></div>
        <div className="slash"></div>
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="App-header">
          <h1>Welcome to Your App</h1>
          <p>Click the button in the top left to open the navigation menu.</p>
        </header>
      </div>
    </div>
  );
}

export default App;
