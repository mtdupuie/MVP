const express = require('express');
const path = require('path');
const db = require('../db')

console.log(db)

// create server
const app = express();

// create middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

app.get('/results', (req, res) => {
  db.getResults()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

app.post('/results', (req, res) => {
  db.addResult(req.body.result)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500);
    })
})

app.post('/signUp', (req, res) => {
  db.signUp(req.body)
    .then((response) => {
      res.send(200);
    })
    .catch((error) => {
      res.send(false);
    })
})

app.get('/login/:username', (req, res) => {
  db.login(req.params.username)
    .then((response) => {
      res.send(response)
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

app.put('/addPoints', (req, res) => {
  db.addToPoints(req.body)
    .then((response) => {
      res.send(response)
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

// start up server
const port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on PORT: ${port}`);
})