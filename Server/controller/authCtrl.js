const winston = require("winston");

const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        }
        console.log(req.isAuthenticated());
        res.redirect('/');
    })
}

const selectLogin = (req, res) => {
    // try {
    //     throw new Error('error')
    // } catch(err) {
    //     winston.info('1111');
    //     winston.debug('2222');
    //     winston.warn('3333');
    //     winston.error('4444');
    //     res.status(404).json({
    //         error: err.message
    //     })
    // }
    res.send(`<a href="http://localhost:8000/auth/google">google</a><br><a href="http://localhost:8000/auth/naver">naver<a><br><a href="http://localhost:3000/auth/kakao">kakao<a><br><a href="http://localhost:3000/auth/logout">logout<a>`)
}

module.exports = {
    logout,
    selectLogin
}
