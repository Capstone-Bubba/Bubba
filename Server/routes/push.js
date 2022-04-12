const express = require('express');
const router = express.Router();
const pushCtrl = require('../controller/pushCtrl');
const auth = require('../middleware/sessoinCheck');

router.get('/', pushCtrl.readPush);

// auth.stateCheck,
router.post('/create', pushCtrl.createPush);

module.exports = router;