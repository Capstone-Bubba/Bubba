const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env" });

module.exports = () => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: process.env.KAKAO_CALLBACK_URL,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            // const user = await authDAO.passportCheckGoogle(profile);
            console.log(profile);
            console.log(accessToken);
            // if (user == '' || user == undefined) {
            //     const insertUser = await authDAO.insertNaverUser(profile);
            //     const newuser = await authDAO.passportCheckNaver(profile);
            //     return done(null, newuser);
            // }
            return done(null, profile);
        } catch (err) {
            console.log(err);
        }
    }))
}