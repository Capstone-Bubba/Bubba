const express = require('express');
const router = express.Router();
const admin = require('../config/pushConn');
const pushCtrl = require('../controller/pushCtrl');

router.post('/mfcc', pushCtrl.pushMfcc);

router.post('/face', pushCtrl.pushFace);

module.exports = router;