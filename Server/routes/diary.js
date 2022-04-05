const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const diaryCtrl = require('../controller/diaryCtrl');

router.get('/', diaryCtrl.readDiary);

router.post('/create', diaryCtrl.createDiary);

router.post('/update', diaryCtrl.updateDiary);

router.post('/delete', diaryCtrl.deleteDiary);

module.exports = router;