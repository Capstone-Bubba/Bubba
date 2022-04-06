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
    res.send(`<a href="http://localhost:3000/auth/google">google</a><br><a href="http://localhost:3000/auth/naver">naver<a><br><a href="http://localhost:3000/auth/kakao">kakao<a><br><a href="http://localhost:3000/auth/logout">logout<a>`)
}

module.exports = {
    logout,
    selectLogin
}
