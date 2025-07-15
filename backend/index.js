const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());

const artistsData = [
    {
      name: 'Luminous Nexus',
      bio: 'An electronic duo known for their ethereal soundscapes and synth-driven melodies.',
      tracks: [
        { title: 'Celestial Drift', formats: ['mp3', 'wav'] },
        { title: 'Neon Tides', formats: ['mp3', 'wav'] },
      ],
    },
    {
      name: 'Echoes of Chronos',
      bio: 'A solo artist who blends classical piano with futuristic ambient textures.',
      tracks: [
        { title: 'Temporal Echoes', formats: ['mp3', 'wav'] },
        { title: 'Faded Photograph', formats: ['mp4', 'webm'] },
      ],
    },
];

const newsData = [
  {
    id: 1,
    title: 'New Album "Digital Dawn" Released!',
    summary: 'Luminous Nexus has just dropped their latest album, "Digital Dawn", featuring 10 new tracks that push the boundaries of electronic music.',
    date: '2024-07-20',
  },
  {
    id: 2,
    title: 'Echoes of Chronos Announces World Tour',
    summary: 'Following the success of their latest video, Echoes of Chronos has announced a 20-city world tour starting this fall. Tickets go on sale next week!',
    date: '2024-07-18',
  },
  {
    id: 3,
    title: 'Studio Session Livestream',
    summary: 'Join us for a special behind-the-scenes livestream from the studio this Friday. Get a sneak peek at how the magic happens.',
    date: '2024-07-15',
  }
];

app.get('/', (req, res) => {
  res.send('Backend server is running. Ready to serve API data from /api/artists and /api/news.');
});

app.get('/api/artists', (req, res) => {
  res.json(artistsData);
});

app.get('/api/news', (req, res) => {
  res.json(newsData);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
