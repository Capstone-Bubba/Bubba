const winston = require("winston");
const authDAO = require("../model/authDAO");

const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            res.send({"error" : err});
        }
        console.log(req.isAuthenticated());
        res.send('Success Logout!');
        // res.redirect('/');
    })
}

const selectLogin = (req, res) => {
    res.send(`<a href="http://localhost:8000/auth/google">google</a><br><a href="http://localhost:8000/auth/naver">naver<a><br><a href="http://localhost:3000/auth/kakao">kakao<a><br><a href="http://localhost:3000/auth/logout">logout<a>`)
}

// const goHome = async (req, res) => {
//     // console.log(req.session);
//     const parameters = {
//         "user_num" : req.session.passport.user.user_num
//     };

//     const result = await authDAO.UserState(parameters);
//     console.log(result);
//     res.send({"result" : result});
// }

module.exports = {
    logout,
    selectLogin,
    // goHome
}
