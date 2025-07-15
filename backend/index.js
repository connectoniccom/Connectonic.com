const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Serve static files from the 'media' directory
app.use('/media', express.static(path.join(__dirname, 'media')));

app.get('/', (req, res) => {
  res.send('Backend server is running. Ready to serve files from the /media directory.');
});

// Handle 404 for any other route - provides a clearer error for missing files
app.use((req, res) => {
  res.status(404).send('File not found. Make sure the media file exists in the backend/media directory.');
});


app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
