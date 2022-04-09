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
                email: profile._json.kakao_account.email,
                platform: profile.provider
            }
            
            const isUser = await authDAO.checkUserID(parameters);
            const isUserNum = await authDAO.checkUserNum(parameters);
            
            if(isUser[0].exist == 0) {
                await authDAO.insertUser(parameters);
            }

            return done(null, {"email": profile._json.kakao_account.email, "platform": profile.provider, "user_num" : isUserNum[0].user_num});
        } catch (err) {
            console.log(err);
            return done(null, false, { message: err });
        }
    }))
}