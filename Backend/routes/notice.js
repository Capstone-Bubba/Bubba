const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');

//query
router.get('/notice/list', noticeCtrl.readNotice);

//query, 
router.get('/notice/view', (req, res) => {
    console.log(req.query);
})

router.post('/notice')
module.exports = router;