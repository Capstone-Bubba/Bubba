const passport = require('passport');
// const KakaoLogin = require('./kakao-login');
const GoogleLogin = require('./google-login');
// const FacebookLogin = require('./facebook-login');

module.exports = () => {
    passport.serializeUser((user,done) => {
        done(null, user);
    })

    passport.deserializeUser((id, done) => {
        done(null, id);
    })

    
    // KakaoLogin();
    GoogleLogin();
    // FacebookLogin();
}