const winston = require("winston");
const authDAO = require("../model/authDAO");
const socket = require('../middleware/socket');

const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send('NO');
        }
        console.log(req.isAuthenticated());
        res.send('OK');
    })
}

const goHome = async (req, res,next) => {
    if (req.session.passport != undefined) {
        const parameters = {
            "user_num": req.session.passport.user.user_num
        }

        const user = await authDAO.UserState(parameters);
        const babyInfo = await authDAO.babyState(parameters);
        let final = {};

        if(babyInfo.length != 0) {
            console.log('success');
            final = Object.assign(user[0], babyInfo[0]);
        } else {
            console.log('no data');
            final = Object.assign(user[0]);
        }
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
    if (result == undefined) {
        res.status(200).redirect(`http://localhost:3000/baby`);
    } else {
        res.status(200).redirect(`http://localhost:3000/home`);
    }
}

module.exports = {
    logout,
    goHome,
    checkBaby,
}
