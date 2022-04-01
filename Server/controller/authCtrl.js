const authDAO = require('../model/authDAO');
const passport = require('passport');

const loginSuccess = async (req, res) => {
    res.redirect('/');
}

const googleLogin = (req, res) => {
    passport.authenticate('google', {scope: ['email']});
}

module.exports = {
    loginSuccess
}