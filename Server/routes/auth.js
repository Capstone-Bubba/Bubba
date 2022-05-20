const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const auth = require('../middleware/sessoinCheck');

router.get('/', authCtrl.selectLogin)

router.get('/naver', auth.sessionCheck, passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: "/auth/naver" }), async (req, res) => {
    res.status(200).redirect('http://localhost:3000/baby');
});

router.get('/google',auth.sessionCheck, passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google'}), authCtrl.checkBaby);

router.get('/kakao', auth.sessionCheck, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: "/auth/kakao" }), async (req, res) => {
    res.status(200).redirect('http://localhost:3000/baby');
});

router.get('/home', authCtrl.goHome);

router.get('/logout', authCtrl.logout);

// router.get('/check', authCtrl.checkBaby)

module.exports = router;