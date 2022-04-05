const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const diaryCtrl = require('../controller/diaryCtrl');

router.get('/', diaryCtrl.readDiary);

router.post('/create', uploadOriginal.uploadDiary.array('files'), diaryCtrl.createDiary);

router.post('/update', uploadOriginal.uploadDiary.array('files'), diaryCtrl.updateDiary);

router.post('/delete', diaryCtrl.deleteDiary);

module.exports = router;