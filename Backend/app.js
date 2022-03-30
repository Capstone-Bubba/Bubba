const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  console.log('root');
  res.sendStatus(200);
})

module.exports = app;