const winston = require("winston");
const authDAO = require("../model/authDAO");
const AIDAO = require('../model/AIDAO');
const dayjs = require('dayjs');
const { default: axios } = require("axios");
const admin = require('../config/pushConn');
const babyDAO = require('../model/babyDAO');

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

const goHome = async (req, res, next) => {
    if (req.session.passport != undefined) {
        const parameters = {
            "user_num": req.session.passport.user.user_num
        }

        const user = await authDAO.UserState(parameters);
        const babyInfo = await authDAO.babyState(parameters);
        let final = {};

        if (babyInfo.length != 0) {
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
    const result = await authDAO.checkBabyId(parameters);
    if (result == undefined) {
        res.status(200).redirect(`http://localhost:3000/baby`);
    } else {
        res.status(200).redirect(`http://localhost:3000/home`);
    }
}

const mfccInfo = async (req, res) => {
    try {
        const parameters = {
            "user_num": req.session.passport.user.user_num
        }
        const result = await AIDAO.OnceMfcc(parameters);
        // console.log(result);
        res.send({ "result": result });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

// app Controller

const FCMDeviceToken = async (req, res) => {
    const parameters = {
        user_num: req.body.user_num,
        deviceToken: req.body.deviceToken,
    }
    console.log(parameters);
    try {
        await authDAO.UpdateUser(parameters);
        // console.log(result);
        res.send('OK');
    } catch (err) {
        console.log(err);
        res.send('Fail');
    }
}

const AppLogin = async (req, res) => {
    try {
        const parameters = {
            email: req.body.email,
            platform: req.body.platform
        }
        console.log(parameters);

        const isUser = await authDAO.checkUserID(parameters);
        console.log(isUser);
        if (isUser[0].exist == 0) {
            await authDAO.insertUser(parameters);
        }
        const isUserNum = await authDAO.checkUserNum(parameters);

        console.log(isUserNum);
        res.send(`${isUserNum[0].user_num}`);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const UpdateRtsp = async (req, res) => {
    const parameters = {
        // "email": req.body.email,
        "user_num": req.query.user_num,
        "rtsp": req.body.rtsp
    };
    console.log(parameters);
    try {
        await authDAO.RtspInfo(parameters);
        await authDAO.update_rtsp(parameters);
        axios.post('http://localhost:5000/rtsp', {
            user: parameters.user_num,
            rtsp: parameters.rtsp
        })
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const mfcc = async (req, res) => {
    const parameters = {
        "user_num": req.query.user_num,
        "data": req.body.data
    };
    console.log(parameters);
    try {
        axios.post('http://localhost:5000/mfcc', {
            user: parameters.user_num,
            data: parameters.data
        })
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const faceInfo = async (req, res) => {
    try {
        const parameters = {
            "user_num": req.session.passport.user.user_num
            // "user_num" : req.query.user_num
        }
        const result = await AIDAO.user_accur(parameters);
        const obj = result.map(val => {
            val.accur_time = dayjs(val.accur_time).format('YYYY.MM.DD HH:mm:ss');
            if (Math.max(val.side, val.back, val.front) == val.side) {
                return val = { "result": "옆면", "accur_time": val.accur_time }
            } else if (Math.max(val.side, val.back, val.front) == val.back) {
                return val = { "result": "뒷면", "accur_time": val.accur_time }
            } else {
                return val = { "result": "앞면", "accur_time": val.accur_time }
            }
        })
        // if(obj[0].result == '뒷면'){
        //     const tokenData = await authDAO.userToken(parameters);
        //     let message = {
        //         token : tokenData,
        //         notification :{
        //             body : "FaceAI"
        //         },
        //         data : {
        //             content : "뒷면",
        //         },
        //         android : {
        //             priority : "high",
        //         },
        //     }
        //     console.log(message.token);

        //     admin.messaging()
        //         .send(message)
        //         .then((response) => {
        //             console.log("Succesfully sent message : ", response);
        //         })
        //         .catch((err) => {
        //             console.log("Error Sending message !!! :", err);
        //         })
        // } else {
        //     console.log(obj[0].result);
        // }
        res.send({ "result": obj });
    } catch (err) {
        console.log("rtsp 정보 없음");
        // res.send({"error" : "rtsp 정보 없음" })
    }
}

const app_mfcc = async (req, res) => {
    try {
        const parameters = {
            "user_num": req.query.user_num
        }
        console.log(parameters)

        const app_mfcc = await AIDAO.ReadMFCC(parameters);
        console.log(app_mfcc);
        res.send({ "result": app_mfcc })
    } catch (e) {
        console.log(e);
    }
}

const checkAppBaby = async (req, res, next) => {
    const parameters = {
        "user_num": req.query.user_num
    }

    const result = await authDAO.checkBabyId(parameters);
    if (result == undefined) {
        console.log('baby_fail')
        res.sendStatus(400);
    } else {
        console.log('success_baby');
        next();
    }
}

module.exports = {
    logout,
    goHome,
    checkBaby,
    FCMDeviceToken,
    AppLogin,
    UpdateRtsp,
    checkAppBaby,
    faceInfo,
    app_mfcc,
    mfccInfo,
    mfcc
}
