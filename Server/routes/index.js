const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('dong');
  // res.send(`<a href="http://localhost:3000/auth">auth</a><br><a href="http://localhost:3000/baby">baby</a>`);
  res.send(`<a href="http://localhost:8000/auth">auth</a><br><a href="http://localhost:8000/baby">baby</a>`);
})

module.exports = router;