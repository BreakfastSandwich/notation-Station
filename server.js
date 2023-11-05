// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
const { title } = require('process');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Create Express.js routes for default '/', '/send' and '/routes' endpoints
app.get('/', (req, res) => 
res.send('Navigate to /notes if this page does not load'));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);



// POST request to add a review
// NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    let response;

  // Check if there is anything in the response body
  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
    };
    console.info(req.body)

    res.status(201).json(response);
  } else {
    res.status(400).json('Request body must at least contain a product name');
  }
  });

  
// GET request for ALL reviews
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    res.sendFile(path.join(__dirname, '/public/db.json'))
  
    // Sending all reviews to the client
    return res.status(200).json(title);
  });





// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
