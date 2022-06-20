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
            const parameters = {
                email: profile.emails[0].value,
                platform: profile.provider
            }
            
            const isUser = await authDAO.checkUserID(parameters);

            if(isUser[0].exist == 0) {
                await authDAO.insertUser(parameters);
            }

            const isUserNum = await authDAO.checkUserNum(parameters);
            return done(null, {"email": profile.emails[0].value, "platform": profile.provider, "user_num" : isUserNum[0].user_num});

        } catch (err) {
            console.log(err);
            return done(null, false);
        }
    }))
}