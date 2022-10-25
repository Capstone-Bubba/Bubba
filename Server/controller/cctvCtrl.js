const streaming = require('../config/streaming');

const cctvStreaming = (req, res) => {
    console.log('test', req.session.passport.user.user_num);
    streaming.start(req.session.passport.user.user_num);
    // streaming.start()
    res.sendStatus(200);
}

module.exports = {
    cctvStreaming
}

