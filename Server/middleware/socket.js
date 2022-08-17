const socket = require("socket.io-client");
const authDAO = require("../model/authDAO");
const flDAO = require("../model/flDAO");

module.exports = async () => {
  // flask 서버와의 socket 연동
  const socketClient = socket("http://localhost:5000");

  const result = await authDAO.checkAllUser();

  socketClient.on("connect", async () => {
    console.log("connection Flask server");
  });

  result.forEach((item) => {
    socketClient.emit('login', {
        data : item.user_num,
        rtsp : item.rtsp
    })
  })

  socketClient.on("rtsp", async (data) => {
    // 이 안에서 DB에 넣는 과정
    const FaceData = JSON.parse(data);
    const parameters = {
        "user_num" : FaceData.user,
        "location" : FaceData['0'],
        "OccurTime" : FaceData.time
    };
    const result = await flDAO.create_log(parameters);
    console.log(parameters);
    // console.log(result);
  });
}