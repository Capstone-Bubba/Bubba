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

module.exports = { 
    sessionCheck,
    userCheck
}
