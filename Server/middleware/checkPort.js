const netstats = require('netstats');
const authDAO = require('../model/authDAO');
const Stream = require('../config/streaming');

const check = (req, res, next) => {
    
    netstats(6055).then((result) => {
        if (result[1].search('6055')) {
            Stream.rtspList.stream.stop();
            setTimeout(() => {
                console.log('settimeout');
                next();
            }, 1000)
        } else {
            console.log('else');
            next();
        }
    })
    .catch((err) => {
        console.log(err);
        next();
    })
}

module.exports = {
    check
}