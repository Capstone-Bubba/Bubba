const noticeDAO = require('../model/noticeDAO');

const readNoticeList = async (req, res) => {
    const result = await noticeDAO.read_notice_list();
    res.send({"result" : result});
    console.log(result);
}

const readNotice = async (req, res) => {
    const parameters = {
        "notice_num" : req.query.num
    }
    const result = await noticeDAO.read_notice(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createNotice = async (req, res) => {
    const parameters = {
        "notice_title": req.body.notice_title,
        "notice_content": req.body.notice_content,
        "writer": req.body.writer
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
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    readNoticeList,
    readNotice,
    createNotice,
    updateNotice,
    deleteNotice
}