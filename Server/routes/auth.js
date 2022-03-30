const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/authCtrl');
const passport = require('passport');

router.get('/', authCtrl.authRoot);

router.get('/kakao', authCtrl.Kakao);           //아래 구글처럼 post방식, get방식 비교해서 해당 


router.post('/google', passport.authenticate('google-login', {
    scope: ['email', "profile"]
}));

router.get('/google/callback', authCtrl.Google);


router.get('/naver', authCtrl.Naver);

module.exports = router;