const e = require("connect-flash");
const socket = require("socket.io-client");
const authDAO = require("../model/authDAO");
const flDAO = require("../model/flDAO");

// const socketClient = socket("http://localhost:5000");

let a = new Set();
let b = new Set();

module.exports = (user) => {
  // flask 서버와의 socket 연동
  socket.id = user.user_num;
  socket.rtsp = user.rtsp;
    
  socketClient.emit('login', {
    user : socket.id,
    rtsp : socket.rtsp
  })

  socketClient.on('rtsp', async (data) => {
    // 이 안에서 DB에 넣는 과정
    const FaceData = JSON.parse(data);
    const parameters = {
        "user_num" : FaceData.user,
        "location" : FaceData['0'],
        "OccurTime" : FaceData.time
    };

    if(!a.has(FaceData)){
      a.add(FaceData);
      await flDAO.create_log(parameters);
      console.log(parameters);
    }
  })

  socketClient.on('accuracy', async (data) => {
    const AccurData = JSON.parse(data);
    console.log(AccurData);
    const parameters = {
      "user_num" : AccurData.user,
      "side" : AccurData.side,
      "back" : AccurData.back,
      "none" : AccurData.none,
      "front" : AccurData.front,
    };

    if(!b.has(AccurData)){
      b.add(AccurData);
      console.log(b);
      await flDAO.accur_log(parameters);
      console.log("This is Accuracy for 30s", AccurData);
    }
  })
}