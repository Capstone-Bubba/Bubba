const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const auth = require('../middleware/sessoinCheck');
const axios = require('axios');

// web auth router

router.get('/naver', auth.sessionCheck, passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: "/auth/naver" }), authCtrl.checkBaby);

router.get('/google',auth.sessionCheck, passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google'}), authCtrl.checkBaby);

router.get('/kakao', auth.sessionCheck, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: "/auth/kakao" }), authCtrl.checkBaby);

router.get('/home', authCtrl.goHome);

router.get('/logout', authCtrl.logout);

// andorid auth router

router.post('/app/token', authCtrl.FCMDeviceToken);

router.post('/app/login', auth.sessionCheck, authCtrl.AppLogin);

module.exports = router;