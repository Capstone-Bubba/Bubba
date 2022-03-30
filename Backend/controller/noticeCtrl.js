const noticeDAO = require('../model/noticeDAO');

const readNotice = async (req, res) => {
    const result = await noticeDAO.read_notice();
    res.send({"result" : result});
    console.log(result);
}

const createNotice = async (req, res) => {
    
}

module.exports = {
    readNotice,
    createNotice
}