const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env" });

module.exports = () => {
    passport.use(new NaverStrategy({
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            // const user = await authDAO.passportCheckNaver(profile);
            console.log(profile);
            console.log(accessToken);
            // if (user == 0){
            //     const insertUser = await authDAO.insertNaverUser(profile);
            //     const newuser = await authDAO.passportCheckNaver(profile);
            //     return done(null, newuser);
            // }
            return done(null, profile);
        } catch (err) {
            return done(null, false, { message: err });
        }
    }
    ))
}