import React from 'react';
import './Artists.css';

const artistsData = [
  {
    name: 'Echoes in Ether',
    bio: 'An electronic music producer known for ambient soundscapes and ethereal beats.',
    tracks: [
      { title: 'Celestial Drift' },
      { title: 'Midnight Signal' },
      { title: 'Digital Aurora' }
    ]
  },
  {
    name: 'Crimson Cascade',
    bio: 'A rock band that blends classic rock riffs with modern alternative energy.',
    tracks: [
      { title: 'Faded Photograph' },
      { title: 'Renegade Heart' },
      { title: 'Static Bloom' }
    ]
  }
];

// The backend server is expected to run on port 3001
const BACKEND_URL = 'http://localhost:3001';

function Artists() {
  return (
    <section id="artists" className="content-section">
      <h2>Artists</h2>
      <p>Discover music and videos from our talented artists. Download your favorites.</p>
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
                    <div className="download-buttons">
                      <a href={`${BACKEND_URL}/download/audio/${track.title}.mp3`} className="download-btn" download>
                        MP3
                      </a>
                      <a href={`${BACKEND_URL}/download/video/${track.title}.mp4`} className="download-btn" download>
                        MP4
                      </a>
                    </div>
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
