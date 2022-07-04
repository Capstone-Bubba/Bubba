const authDAO = require('../model/authDAO');

const sessionCheck = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('Already Logged In');
        res.send({"error" : 'Already Logged In'});
    } else {
        console.log('Not Logged In');
        next();
    }
}

const userCheck = (req, res, next) => {
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
    if(result[0].authority == 1){
        next();
    } else {
        res.send({"error" :'관리자 권한이 필요합니다'});
    }
};

module.exports = { 
    sessionCheck,
    userCheck,
    authorityCheck,
}
