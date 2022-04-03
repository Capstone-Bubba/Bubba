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

            const data = await authDAO.sessionCheck();
            console.log(data);

            const even = (el) => {
                const sessionPassport = JSON.parse(el.data).passport;
                const result = JSON.stringify(sessionPassport.user) === JSON.stringify(parameters);
                return result;
            }

            if(data.some(even)) {
                return done(null, false)
            } else {
                return done(null, {"email": profile.emails[0].value, "platform": profile.provider});
            }
           
            
        } catch (err) {
            console.log(err);
            return done(null, false, { message: err });
        }
    }))
}