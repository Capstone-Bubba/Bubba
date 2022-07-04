const streaming = require('../config/streaming');

const cctvStreaming = (req, res) => {
    streaming.start()

    res.sendStatus(200);
}

module.exports = {
    cctvStreaming
}

