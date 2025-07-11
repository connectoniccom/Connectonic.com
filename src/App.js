import React from 'react';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
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
