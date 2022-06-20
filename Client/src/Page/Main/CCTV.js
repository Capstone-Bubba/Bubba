import React, { useEffect } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from 'axios';
import { Container } from "@material-ui/core";

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
    <Container>
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
        아기 실시간 영상
      </div>
      <div id="video-canvas"
        style={{
          height: "550px",
          width: "100%",
          marginTop:'3%',

        }}></div>
    </div>
    </Container>
  );
};

export default CCTV;

