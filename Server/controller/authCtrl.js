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
        console.log(finalArr);
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

// app Controller

const checkAppBaby = async (req, res) => {
    const parameters = {
        "user_num" : req.session.passport.user.user_num
    }

    const result = await authDAO.checkBabyId(parameters);
    if(result == undefined) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
}

const FCMDeviceToken = async (req, res) => {
    const parameters = {
        email : req.body.email,
        deviceToken : req.body.deviceToken,
    }
    console.log(parameters);
    try{
        await authDAO.UpdateUser(parameters);
        // console.log(result);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const AppLogin = async (req, res) => {
    try{
        const parameters = {
            email : req.body.email,
            platform : req.body.platform
        }

        const isUser = await authDAO.checkUserID(parameters);
        if(isUser[0].exist == 0) {
            await authDAO.insertUser(parameters);
        }

        const isUserNum = await authDAO.checkUserNum(parameters);
        console.log(isUserNum);
        req.session.passport = {};
        req.session.passport.user = {};
        req.session.passport.user.email = parameters.email;
        req.session.passport.user.platform = parameters.platform;
        req.session.passport.user.user_num = isUserNum[0].user_num;
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const UpdateRtsp = async (req, res) => {
        const parameters = {
            // "user_num": req.session.passport.user.user_num,
            "user_num" : req.query.num,
            "rtsp" : req.body.rtsp
        };
    try{
        await authDAO.RtspInfo(parameters);
        await authDAO.update_rtsp(parameters);
        socket(parameters);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    logout,
    goHome,
    checkBaby,
    FCMDeviceToken,
    AppLogin,
    checkAppBaby,
    UpdateRtsp,
}
