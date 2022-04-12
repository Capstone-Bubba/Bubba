const pushDAO = require('../model/pushDAO');

const readPush = async (req, res) => {
    const result = await pushDAO.read_push();
    res.send({"result" : result});
    console.log(result);
};

const createPush = async (req, res) => {
    const parameters = {
        "user_num" : req.session.passport.user.user_num,
        "push_title" : req.body.push_title,
        "push_content" : req.body.push_content,
    };

    try{
        await pushDAO.create_push(parameters);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
};

module.exports = {
    readPush,
    createPush,
}