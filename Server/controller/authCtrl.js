const authDAO = require('../model/authDAO');

const loginFail = async (req, res) => {
    res.send("fail");
}



module.exports = {
    loginFail
}