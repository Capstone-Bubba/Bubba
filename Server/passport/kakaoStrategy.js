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
            const parameters = {
                platform: profile.provider,
                email: profile._json.kakao_account.email
            }
            const isUser = await authDAO.checkUserID(parameters);
            if(isUser[0].exist == 0) {
                await authDAO.insertUser(parameters);
            }

            return done(null, [profile._json.kakao_account.email, profile.provider]);
        } catch (err) {
            return done(null, false, { message: err });
        }
    }))
}