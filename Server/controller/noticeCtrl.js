const noticeDAO = require('../model/noticeDAO');
const admin = require('../config/pushConn');
const authDAO = require('../model/authDAO');

const readNoticeList = async (req, res) => {
    const result = await noticeDAO.read_notice_list();
    res.send({"result" : result});
}

const readNotice = async (req, res) => {
    const parameters = {
        "notice_num" : req.query.num
    }
    const result = await noticeDAO.read_notice(parameters);
    res.send({"result" : result});
}

const createNotice = async (req, res) => {
    const parameters = {
        "notice_title": req.body.notice_title,
        "notice_content": req.body.notice_content,
        "writer": req.body.writer,
    }
    try {
        await noticeDAO.create_notice(parameters);
        const tokenData = await authDAO.ReadDeviceToken();
        console.log(tokenData);
        let message = {
            token : tokenData,
            notification :{
                body : "Notice"
            },
            data : {
                title : parameters.notice_title,
                content : parameters.notice_content,
                writer : parameters.writer
            },
            android : {
                priority : "high",
            },
        }
        console.log(message.token);
    
        admin.messaging()
            .send(message)
            .then((response) => {
                console.log('Successfully sent message : ', response);
                res.send(response);
            })
            .catch((err) => {
                console.log('Error Sending message !! : ', err);
                res.send(err);
            })
    } catch(err) {
        console.log(err);
    }
}

const updateNotice = async (req, res) => {
    const parameters = {
        "notice_num" : req.query.num,
        "notice_title" : req.body.notice_title,
        "notice_content" : req.body.notice_content
    }
    try {
        await noticeDAO.update_notice(parameters);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
}

const deleteNotice = async (req, res) => {
    const parameters = {
        "notice_num" : req.query.num
    }

    try {
        await noticeDAO.delete_notice(parameters);
        res.send('OK');
    } catch(err) {
        console.log(err);
        res.send('Error');
    }
}

module.exports = {
    readNoticeList,
    readNotice,
    createNotice,
    updateNotice,
    deleteNotice,
}