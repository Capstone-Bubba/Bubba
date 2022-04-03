const loginSuccess = async (req, res) => {
    res.redirect('/');
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = {
    loginSuccess,
    logout
}