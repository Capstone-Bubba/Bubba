const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');
const auth = require('../middleware/sessoinCheck');

//query
router.get('/notice/list', noticeCtrl.readNoticeList);

//query, 
router.get('/notice/view', noticeCtrl.readNotice);

router.post('/notice/write', auth.authorityCheck, noticeCtrl.createNotice);

router.put('/notice/update', auth.authorityCheck, noticeCtrl.updateNotice);

module.exports = router;