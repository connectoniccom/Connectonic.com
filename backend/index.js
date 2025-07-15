const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

app.use('/media', express.static(path.join(__dirname, 'media')));

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
