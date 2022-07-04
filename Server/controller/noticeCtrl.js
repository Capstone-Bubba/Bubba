const noticeDAO = require('../model/noticeDAO');
const admin = require('../config/pushConn');

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
        res.sendStatus(200);
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
        // await noticeDAO.reset_noticeNum(parameters);
        res.send('OK');
    } catch(err) {
        console.log(err);
        res.send('Error');
    }
}

const pushNotice = async (req, res) => {
    const parameters = {
        "notice_num" : req.query.num
    }
    const result = await noticeDAO.read_notice(parameters);
    let message = {
        token : 'c6Ean20xTLiVbr2WakyLtP:APA91bFkBb_7BTu63V3Zc4sMAu1oDiu-GvyvkoBpv3XZqhn85WpOKVJxliqq03d8n9Wxo3BgkL4lS8xordF0brHr6zp-G0W4sIoMtYJ4Azmpew9Bjz05F8HGm3W2PzD1neVvIUAsh6Xc',
        notification :{
            body : "Notice"
        },
        data : {
            title : result[0].notice_title,
            body : result[0].notice_content
        },
        android : {
            priority : "high",
        },
    }

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
}

module.exports = {
    readNoticeList,
    readNotice,
    createNotice,
    updateNotice,
    deleteNotice,
    pushNotice,
}