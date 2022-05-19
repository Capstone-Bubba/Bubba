const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');
const auth = require('../middleware/sessoinCheck');

//query
router.get('/', noticeCtrl.readNoticeList);

//query, 
router.get('/detail', noticeCtrl.readNotice);

router.post('/write', noticeCtrl.createNotice);

router.put('/update', auth.authorityCheck, noticeCtrl.updateNotice);

router.post('/delete', noticeCtrl.deleteNotice);

module.exports = router;