const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('dong');
  res.sendStatus(200);
})

router.get('/fail', (req, res) => {
  console.log('fail');
  res.sendStatus(200);
})

module.exports = router;