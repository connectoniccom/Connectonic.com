const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

// API endpoint to get artist data
app.get('/api/artists', (req, res) => {
  res.json(artistsData);
});

// Root path response - THIS MUST COME BEFORE THE CATCH-ALL
app.get('.', (req, res) => {
  res.send('Backend server is running. Ready to serve API data from /api/artists.');
});

// Handle 404 for any other route - THIS MUST BE LAST
app.use((req, res) => {
  res.status(404).send('Endpoint not found.');
});


app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
