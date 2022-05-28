// import axios from 'axios'
// import React, {useState, useEffect} from 'react'

// function CCTV() {
//   const [data, setData] = useState();
//   useEffect(() => {
//     async function check() {
//         await axios.get('http://localhost:8000/cctv').then((res) => {
//             console.log(res)
//             setData(res)
//         })
//     }
//     // console.log(data)
//     check()
// }, []);
//     const img = document.getElementById('img'),
//         socket = io('');
//     socket.on('data', function(data) {
//         img.src = 'data:image/j peg;base64,' + data;
//     });
//    socket.on('user.count', function(number){
//       document.getElementById('user-count').innerHTML=number;
//    });
//   return (
//     <div>
//       <h1>접속자 수 : <span id='user-count'>?</span></h1>
//       <img id="img"/>
//     </div>
//   )
// }

// export default CCTV

import React, { useEffect } from "react";
// import "./App.css";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from 'axios';

const ffmpegIP = "127.0.0.1";

const CCTV = () => {
  useEffect(() => {
    axios.get('http://localhost:8000/cctv').then((res) => {
      var videoUrl = `ws://${ffmpegIP}:6055/`;
      var player = new JSMpeg.VideoElement("#video-canvas", videoUrl, {
        autoplay: true,
      });
      console.log(player);
    })
  }, []);

  return (
    <div id="body">
      <div
        id="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "10px",
          marginBottom: "10px",
          color: "blue",
        }}
      >
        Player stream RTSP
      </div>
      <div id="video-canvas" style={{ height: "480px", width: "640px" }}></div>
    </div>
  );
};

export default CCTV;

