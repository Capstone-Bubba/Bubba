const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const babyCtrl = require('../controller/babyCtrl');

// 아기 상태 표시 
router.get('/', babyCtrl.readBabyList);

router.post('/create', babyCtrl.createBaby);

router.get('/detail', babyCtrl.readBaby);

router.post('/update', babyCtrl.updateBaby);

router.post('/delete', babyCtrl.deleteBaby);

module.exports = router;