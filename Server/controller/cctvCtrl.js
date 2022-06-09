const streaming = require('../config/streaming');

const cctvStreaming = (req, res) => {
    // streaming.start();
    streaming.Streaming();
    res.sendStatus(200);
}

module.exports = {
    cctvStreaming
}