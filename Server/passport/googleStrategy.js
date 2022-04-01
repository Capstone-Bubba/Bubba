const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const authDAO = require('../model/authDAO');
require('dotenv').config({ path: ".env" });

module.exports = () => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
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