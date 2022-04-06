const authDAO = require('../model/authDAO');

const sessionCheck = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('Already Logged In');
        res.redirect('/');
    } else {
        console.log('Not Logged In');
        next();
    }
}

const userCheck = (req, res, next) => {
    console.log('userCheck');
    if(req.isAuthenticated()) {
        next();
    } else {
        console.log('Not Logged In');
        res.redirect('/auth');
    }
}

const authorityCheck = async (req, res, next) => {
    console.log('authorityCheck');
    const parameters = {
        "user_num" : req.session.passport.user.user_num
    };
    const result = await authDAO.checkAuthority(parameters);
    console.log(result);

    // next();
}

module.exports = { 
    sessionCheck,
    userCheck,
    authorityCheck
}
