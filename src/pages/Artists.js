import React, { useState, useEffect } from 'react';
import './Artists.css';

function Artists() {
  const [artistsData, setArtistsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/artists')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArtistsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="artists" className="content-section">
        <h2>Artists</h2>
        <p>Loading artists...</p>
      </section>
    );
  }

  if (!artistsData.length) {
    return (
      <section id="artists" className="content-section">
        <h2>Artists</h2>
        <p>No artists found. Make sure the backend server is running.</p>
      </section>
    );
  }

  return (
    <section id="artists" className="content-section">
      <h2>Artists</h2>
      <p>Discover music from our talented artists, served directly from the backend.</p>
      <div className="artists-container">
        {artistsData.map((artist, index) => (
          <div key={index} className="artist-card">
            <h3>{artist.name}</h3>
            <p className="artist-bio">{artist.bio}</p>
            <div className="tracks-list">
              <h4>Tracks</h4>
              <ul>
                {artist.tracks.map((track, trackIndex) => (
                  <li key={trackIndex} className="track-item">
                    <span className="track-title">{track.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Artists;
