const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');
const auth = require('../middleware/sessoinCheck');

//query
router.get('/', noticeCtrl.readNoticeList);

//query, 
router.get('/detail', noticeCtrl.readNotice);

router.post('/write', auth.authorityCheck, noticeCtrl.createNotice);

router.put('/update', auth.authorityCheck, noticeCtrl.updateNotice);

router.post('/delete', auth.authorityCheck, noticeCtrl.deleteNotice);

router.get('/send', noticeCtrl.pushNotice);

module.exports = router;