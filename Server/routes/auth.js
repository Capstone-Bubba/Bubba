const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');

router.get('/naver', passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: "/fail", successRedirect: "/" }));

router.get('/google', passport.authenticate('google', { scope: ['email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google', successRedirect: "/" }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail', successRedirect: "/" }));

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: "/fail", successRedirect: "/" }));

router.get('/logout', authCtrl.logout);

module.exports = router;