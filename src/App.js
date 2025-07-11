import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="hamburger-icon"></span>
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleTheme={toggleTheme} currentTheme={theme} />
      <div id="main-content">
        <h1>Welcome to My App</h1>
        <p>Here is your content. The theme is currently {theme}.</p>
      </div>
    </div>
  );
}

export default App;
