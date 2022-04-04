const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const babyCtrl = require('../controller/babyCtrl');

router.get('/', babyCtrl.readBaby);

router.post('/create', babyCtrl.createBaby);

router.get('/update', (req, res) => {
    console.log('get update');
});

router.post('/update', babyCtrl.updateBaby);

router.post('/delete', babyCtrl.deleteBaby);

module.exports = router;