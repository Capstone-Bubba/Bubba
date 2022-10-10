const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const babyCtrl = require('../controller/babyCtrl');
const authCtrl = require('../controller/authCtrl');

// 아기 상태 표시 WEB
router.get('/', babyCtrl.readBabyList);

router.post('/create', uploadOriginal.uploadBaby.single('file'), babyCtrl.createBaby);

router.get('/detail', babyCtrl.readBaby);

router.post('/update', uploadOriginal.uploadBaby.single('file'), babyCtrl.updateBaby);

router.post('/delete', babyCtrl.deleteBaby);

// app baby Router

router.get('/app', authCtrl.checkAppBaby,  babyCtrl.readAppBabyList);

// router.get('/app/create', uploadOriginal.uploadBaby.single('file'), babyCtrl.createAppBaby);

// router.get('/app/detail', babyCtrl.readAppBaby);

// router.post('/app/update', uploadOriginal.uploadBaby.single('file'), babyCtrl.updateAppBaby);



module.exports = router;