const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

// This is a placeholder for your media files.
// You should create a 'media' folder in the 'backend' directory
// and place your audio and video files there.
// For example: backend/media/audio/song.mp3
const mediaPath = path.join(__dirname, 'media');

app.get('/download/:type/:filename', (req, res) => {
  const { type, filename } = req.params;
  
  if (type !== 'audio' && type !== 'video') {
    return res.status(400).send('Invalid file type specified.');
  }

  const filePath = path.join(mediaPath, type, filename);

  // Security check to prevent accessing files outside the media directory
  if (!filePath.startsWith(mediaPath)) {
      return res.status(403).send('Forbidden');
  }

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Could not download the file.');
      }
    });
  } else {
    console.warn(`File not found: ${filePath}`);
    res.status(404).send('File not found. Make sure you have added it to the backend/media folder.');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log('Ensure you have a "media" folder inside the "backend" directory with "audio" and "video" subfolders.');
});
