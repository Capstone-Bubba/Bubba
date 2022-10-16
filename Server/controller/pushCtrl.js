const pushDAO = require('../model/pushDAO');
const adminAndroid = require('firebase-admin');
const admin = require('../config/pushConn');


//   let target_token = req.body.token;
  

const readPush = async (req, res) => {
    const result = await pushDAO.read_push();
    res.send({"result" : result});
};

const createPush = async (req, res) => {
    const parameters = {
        "user_num" : req.session.passport.user.user_num,
        "push_title" : req.body.push_title,
        "push_content" : req.body.push_content,
    };

    try{
        await pushDAO.create_push(parameters);
        res.send('/push/push_send');
    } catch(err) {
        console.log(err);
    }
};

const androidPush = async (req, res) => {
    const parameters = {
        "push_num" : req.query.push_num
    };

    try{
        const result = await pushDAO.read_push_num(parameters);
        console.log(result[0].push_title);
        res.send({"result" : result});
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    readPush,
    createPush,
    androidPush,
}