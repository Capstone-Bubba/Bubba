const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');

//query
router.get('/notice/list', noticeCtrl.readNoticeList);

//query, 
router.get('/notice/view', noticeCtrl.readNotice);

router.post('/notice/write', noticeCtrl.createNotice);

router.put('/notice/update', noticeCtrl.updateNotice);

module.exports = router;