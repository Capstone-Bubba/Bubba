const socket = require('socket.io-client');
const authDAO = require('../model/authDAO');
const pushDAO = require('../model/pushDAO');

// flask 서버와의 socket 연동
const socketClient = socket('http://localhost:5000');

socketClient.on('connect', () => {
    console.log('connection Flask server');
});

const login = async (data) => {
    const result = await authDAO.UserState(data);
    socketClient.emit('login', 
        { 
          data : data,
          rtsp : result[0].rtsp
        });
};

socketClient.on('rtsp', (data) => {
    console.log(data);
})

module.exports = {
    login,
}