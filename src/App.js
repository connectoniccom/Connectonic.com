import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="hamburger-icon"></span>
      </button>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleTheme={toggleTheme} 
        currentTheme={theme} 
        closeSidebar={closeSidebar} 
      />
      <div id="main-content" onClick={closeSidebar}>
        <h1>Welcome to My App</h1>
        <p>Here is your content. The theme is currently {theme}.</p>
      </div>
    </div>
  );
}

export default App;
