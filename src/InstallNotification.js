import React from 'react';
import './InstallNotification.css';

function InstallNotification({ onInstall }) {
  return (
    <div className="install-notification">
      <p>Get our app for a better experience!</p>
      <button onClick={onInstall}>Install</button>
    </div>
  );
}

export default InstallNotification;
