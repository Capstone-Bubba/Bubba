const loginSuccess = async (req, res) => {
    res.redirect('/');
}

const loginFail = async (req, res) => {
    console.log('fail');
    // console.log(req);
    res.sendStatus(200);
}

const asd = (req, res) => {
    console.log('asd');
    res.sendStatus(200);
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = {
    loginSuccess,
    logout,
    loginFail,
    asd
}