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
                email: profile.emails[0].value,
                platform: profile.provider
            }
            const isUser = await authDAO.checkUserID(parameters);
            
            if(isUser[0].exist == 0) {
                await authDAO.insertUser(parameters);
            }

            const data = await authDAO.sessionCheck();

            const even = (el) => {
                const sessionPassport = JSON.parse(el.data).passport;
                const result = JSON.stringify(sessionPassport.user) === JSON.stringify(parameters);
                return result;
            }

            if(data.some(even)) {
                return done(null, false)
            } else {
                return done(null, {"email": profile._json.kakao_account.email, "platform": profile.provider});
            }

        } catch (err) {
            return done(null, false, { message: err });
        }
    }))
}