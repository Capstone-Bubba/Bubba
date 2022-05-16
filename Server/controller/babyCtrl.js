const babyDAO = require('../model/babyDAO');
let dayjs = require('dayjs');

const readBabyList = async (req, res) => {
    const parameters = {
        "user_num" : req.session.passport.user.user_num
    };
    
    const result = await babyDAO.read_babyList(parameters);
    res.send({"result" : result});
    console.log(result);
}

const readBaby = async (req, res) => {
    console.log(req);
    const parameters = {
        "user_num" : req.session.passport.user.user_num
    };
    
    const result = await babyDAO.read_baby(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createBaby = async (req, res) => {
    let date = dayjs(req.body.birth);
    let birth = date.format('YYYY-MM-DD');
    let baby_picture = req.file.filename;

    const parameters = {
        "baby_name" : req.body.baby_name, //이름
        "birth" : birth, //생년월일
        "gender" : req.body.gender, //성별
        "baby_picture" : baby_picture, //아기 사진
        "user_num" : req.session.passport.user.user_num
    };

    console.log(parameters);

    try {
        await babyDAO.create_baby(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }    
};

const updateBaby = async (req, res) => {
    let date = dayjs(req.body.birth);
    let birth = date.format('YYYY-MM-DD');
    let baby_picture = req.file.filename;

    const parameters = {
        "baby_name" : req.body.baby_name,
        "birth" : birth,
        "gender" : req.body.gender,
        "baby_picture" : baby_picture,
        "user_num" : req.session.passport.user.user_num,
        "baby_num" : req.query.baby_num
    };
    try {
        await babyDAO.update_baby(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
};

const deleteBaby = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num 
    };
    try {
        await babyDAO.delete_baby(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    readBabyList,
    readBaby,
    createBaby,
    updateBaby,
    deleteBaby
}