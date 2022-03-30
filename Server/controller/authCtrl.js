const authDAO = require('../model/authDAO');
const passport = require('passport');

const authRoot = async (req, res) => {
    res.send('auth root page');
}

const Naver = async (req, res) => {
    res.send('naver page');
}

const Kakao = async (req, res) => {
    res.send("kakao page");
}

const Google = async (req, res) => {
    passport.authenticate('google-login', {
        scope: ['email', "profile"]
    });
}

module.exports = {
    authRoot,
    Kakao,
    Naver,
    Google
}