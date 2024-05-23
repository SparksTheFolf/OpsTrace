const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the logger middleware for all routes
app.use(logger);

// Sample routes for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.put('/update', (req, res) => {
  res.send('Update received');
});

app.post('/create', (req, res) => {
  res.send('Create received');
});

app.delete('/delete', (req, res) => {
  res.send('Delete received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
