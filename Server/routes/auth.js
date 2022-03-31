const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');

router.get('/', authCtrl.loginFail);

router.get('/naver', passport.authenticate('naver-login'));

router.get('/naver/callback', passport.authenticate('naver-login', {
    successRedirect: '/',
    failureRedirect: "/auth",
    failureFlash : true
}));

module.exports = router;