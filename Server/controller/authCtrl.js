const winston = require("winston");
const authDAO = require("../model/authDAO");

const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send('NO');
        }
        console.log(req.isAuthenticated());
        res.send('OK');
        // res.redirect('/');
    })
}

const selectLogin = (req, res) => {
    res.send(`<a href="http://localhost:8000/auth/google">google</a><br><a href="http://localhost:8000/auth/naver">naver<a><br><a href="http://localhost:3000/auth/kakao">kakao<a><br><a href="http://localhost:3000/auth/logout">logout<a>`)
}

const goHome = async (req, res,next) => {
    if (req.session.passport != undefined) {
        const parameters = {
            "user_num": req.session.passport.user.user_num
        }

        const user = await authDAO.UserState(parameters);
        const babyInfo = await authDAO.babyState(parameters);
        let final = {};

        if(babyInfo.length != 0 && babyInfo.length != 0) {
            console.log('success');
            final = Object.assign(user[0], babyInfo[0]);
        } else {
            console.log('no data');
            final = Object.assign(user[0]);
        }
        console.log(final);
        const finalArr = [];
        finalArr.push(final);
        res.send({ "result": finalArr });
    } else {
        next()
    }
}

const checkBaby = async (req, res) => {
    const parameters = {
        "user_num": req.session.passport.user.user_num
    }
    const result = await authDAO.checkBabyId(parameters)
    console.log("checkBaby", result);
    if (result == undefined) {
        console.log('baby')
        res.status(200).redirect(`http://localhost:3000/baby`);
    } else {
        console.log('home')
        res.status(200).redirect(`http://localhost:3000/home`);
    }
}

module.exports = {
    logout,
    selectLogin,
    goHome,
    checkBaby
}
