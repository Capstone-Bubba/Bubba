const sessionCheck = async (req, res, next) => {
    if(!(req.session.passport.user)) {
        console.log('로그인 안되어있음');
        next();
    } else if(req.session.passport.user) {
        console.log('로그인 되어있음');
        
        res.redirect('/');
    }
}

module.exports = { 
    sessionCheck
}
