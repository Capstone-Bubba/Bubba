const express = require('express');
const router = express.Router();
const pushCtrl = require('../controller/pushCtrl');

router.get('/', pushCtrl.readPush);

module.exports = router;