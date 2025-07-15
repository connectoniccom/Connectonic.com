const express = require('express');
const app = express();
const port = 3001;

// Define a route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Send a response back to the client
  });

  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
    });
    