const winston = require("winston");
const authDAO = require("../model/authDAO");

const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send({ "error": err });
        }
        console.log(req.isAuthenticated());
        res.send('Success Logout!');
        // res.redirect('/');
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

const goHome = async (req, res,next) => {
    // console.log(req.session);
    console.log(req.session.passport)
    // const session_len = req.session.
    if (req.session.passport != undefined) {
        const parameters = {
            "user_num": req.session.passport.user.user_num
        }

        const result = await authDAO.UserState(parameters);
        console.log(result);
        res.send({ "result": result });
    } else {
        next()
    }
}
const checkBaby = async (req, res) => {
    const parameters = {
        "user_num": req.session.passport.user.user_num
    }
    const result = await authDAO.checkBabyId(parameters)
    if (result == undefined) {
        res.status(200).redirect(`http://localhost:3000/baby`);
    } else {
        res.status(200).redirect(`http://localhost:3000/home`);
    }
}

module.exports = {
    logout,
    selectLogin,
    goHome,
    checkBaby
}
