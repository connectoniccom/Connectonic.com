const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Serve static files from the 'media' directory
app.use('/media', express.static(path.join(__dirname, 'media')));

// Endpoint to handle media streaming
app.get('/media/:type/:filename', (req, res) => {
    const { type, filename } = req.params;
    const filePath = path.join(__dirname, 'media', type, filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            if (!res.headersSent) {
                res.status(404).send('File not found');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
