const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const auth = require('../middleware/sessoinCheck');

router.get('/', authCtrl.selectLogin)

router.get('/naver', auth.sessionCheck, passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: "/auth/naver", successRedirect: "/" }));

router.get('/google', auth.sessionCheck, passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google', successRedirect: "/" }));

router.get('/kakao', auth.sessionCheck, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: "/auth/kakao", successRedirect: "/" }));

router.get('/logout', authCtrl.logout);

module.exports = router;