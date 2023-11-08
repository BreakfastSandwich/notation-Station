const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

// const routes = require('./controllers');


const { title } = require('process');


const app = express();
const PORT = 3001;


// app.use(routes);
app.use(express.json());
app.use(express.static('public'));
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
  console.log(db)
    let response;
    

  // Check if there is anything in the response body
  if (req.body && req.body.title) {
    response = {
      status: 'success',
      data: req.body,
    };
    console.info(req.body)
    req.body.id = uuidv4()

    db.push(req.body)

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {if(err){throw err}})
    

    res.status(201).json(response);
  } else {
    res.status(400).json('Request body must at least contain a product name');
  }
  });

  
// GET request for ALL reviews
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal


    res.sendFile(path.join(__dirname, '/db/db.json'))
  
    // Sending all reviews to the client
    // return res.status(200).json(title);
  });

  // GET request for ALL reviews
app.delete('/api/notes/:id', (req, res) => {
  // Log our request to the terminal
  db
  res.sendFile(path.join(__dirname, '/db/db.json'))

  // Sending all reviews to the client
  // return res.status(200).json(title);
});





// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
