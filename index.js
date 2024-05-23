const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const { generateHistoryTable } = require('./history');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the logger middleware for all routes
app.use(logger);

// Route for /history
app.get('/history', (req, res) => {
  const userId = req.headers['user'] || 'anonymous';
  const historyTable = generateHistoryTable(userId, 100); // Get the last 100 log entries
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>History</title>
      <!-- Import Bootstrap CSS -->
      <link rel="stylesheet" href="/bootstrap.min.css">
    </head>
    <body>
      <div class="container">
        ${historyTable}


        <script >

        $(function () {
          $('[data-toggle="popover"]').popover()
        })
        
        </script>

        <script src="/jquery.js"></script>
        <script src=/bootstrap.popper.min.js></script>
        <script src=/bootstrap.min.js></script>
      </div>
    </body>
    </html>
  `);
});

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




// Route for serving Bootstrap CSS
app.get('/bootstrap.min.css', (req, res) => {
  const bootstrapUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
  res.redirect(bootstrapUrl);
});

app.get('/bootstrap.popper.min.js', (req, res) => {
  const bootstrapUrl = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';
  res.redirect(bootstrapUrl);
});

app.get('/bootstrap.min.js', (req, res) => {
  const bootstrapUrl = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
  res.redirect(bootstrapUrl);
});

app.get('/jquery.js', (req, res) => {
  const jqueryUrl = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
  res.redirect(jqueryUrl);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
