const express = require('express');
const router = express.Router();
const passport = require('passport');
const authCtrl = require('../controller/authCtrl');
const auth = require('../middleware/sessoinCheck');
const axios = require('axios');

router.get('/naver', auth.sessionCheck, passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', { failureRedirect: "/auth/naver" }), authCtrl.checkBaby);

router.get('/google',auth.sessionCheck, passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google'}), authCtrl.checkBaby);

router.get('/kakao', auth.sessionCheck, passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', { failureRedirect: "/auth/kakao" }), authCtrl.checkBaby);

router.get('/home', authCtrl.goHome);

router.get('/logout', authCtrl.logout);

router.get('/test', async (req, res) => {
    try{
        // const response_get = await axios.get('http://localhost:5000/test');
        // console.log(response_get.data);

    
        const response_post = await axios({
            method : 'post',
            url : 'http://localhost:5000/test',
            headers : {},
            data: {
                "rtsp" : "rtsp://1.228.75.116:8554/unicast"
            }
        });
        console.log(response_post.data);
        } catch (err){
            console.log(err);
        }
})

module.exports = router;