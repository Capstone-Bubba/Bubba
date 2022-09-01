const streaming = require('../config/streaming');

const cctvStreaming = (req, res) => {
    
    streaming.start(req.session.passport.user.user_num)
    // streaming.start()
    res.sendStatus(200);
}

module.exports = {
    cctvStreaming
}

