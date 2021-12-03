const express = require('express');
const path = require('path');

// create server
const app = express();

// create middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

// start up server
const port = 3000;
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on PORT: ${port}`);
})