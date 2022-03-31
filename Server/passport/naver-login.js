const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path : ".env"});

module.exports = () => {
    passport.use('naver-login', new NaverStrategy({
        clientID : process.env.Naver_Client,
        clientSecret : process.env.Naver_Secret,
        callbackURL : process.env.Naver_Callback,
        passReqToCallback : true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try{
            const user = await authDAO.passportCheckNaver(profile);
            console.log(user);
            if (user == 0){
                const insertUser = await authDAO.insertNaverUser(profile);
                const newuser = await authDAO.passportCheckNaver(profile);
                return done(null, newuser);
            }
            return done(null, user);
        } catch (err) {
            return done(null, false, {message : err});
        }
    }
    ))
}