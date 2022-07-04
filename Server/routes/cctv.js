const express = require('express');
const router = express.Router();
const cctvCtrl = require('../controller/cctvCtrl');
const checkPort = require('../middleware/checkPort');

//node_moudles -> node-rtsp-stream ->  videoStream.js -> stop function 주석 후  
// VideoStream.prototype.restartStream = function(){
//   this.stream.kill()
//   return this.startMpeg1Stream()
// } 추가

// router.get('/', cctvCtrl.cctvStreaming);
router.get('/', checkPort.check, cctvCtrl.cctvStreaming);

module.exports = router;