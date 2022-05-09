const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<a href="http://localhost:8000/auth">auth</a><br><a href="http://localhost:8000/baby">baby</a>`);
})

module.exports = router;