const Stream = require("node-rtsp-stream");

// const start = () => {
let rtspList = [
        { "url": 'rtsp://1.228.75.116:8554/stream1', "port": 6055, "stream": null, "lastData": null },
];

//let sendSecond = "";
let rtspListLength = rtspList.length;

for (let i = 0; i < rtspListLength; i++) {

        openStream(rtspList[i]);

        // let timer = setInterval(function (obj) {
        setInterval(function (obj) {
                let today = new Date();
                console.log(i);
                if (obj.lastData !== undefined) {
                        let stream_date = new Date(obj.lastData);
                        let gap = (today.getTime() - stream_date.getTime()) / 1000;
                        console.log(gap);
                        // console.log(rtspList[i].port)

                        if (gap >= 5) {//check gap of second
                                //obj.stream.stop();
                                //openStream(obj);


                                obj.lastData = today;
                                obj.stream = obj.stream.restartStream();

                                obj.stream.mpeg1Muxer.on('ffmpegStderr', (data) => {
                                        let today = new Date();
                                        obj.lastData = today;
                                });


                        }
                }

        }, 1000, rtspList[i]);

}



// }

function openStream(obj) {
                let stream = new Stream({
                        name: 'name',
                        streamUrl: obj.url,
                        wsPort: obj.port || 9999,
                        ffmpegOptions: { // options ffmpeg flags
                                '-stats': '', // an option with no neccessary value uses a blank string
                                '-r': 30, // options with required values specify the value after the key
                        }
                });

        
        obj.stream = stream;

        stream.mpeg1Muxer.on('ffmpegStderr', (data) => {
                let today = new Date();
                obj.lastData = today;
        });
}

// const Streaming = () => {
//     stream = new Stream({
//       name: "Bunny",
//       // streamUrl: "rtsp://YOUR_IP:PORT",
//       streamUrl: "rtsp://1.228.75.116:8554/stream1",
//       // streamUrl: "",
//       wsPort: 6789,
//       ffmpegOptions: { // options ffmpeg flags
//         "-f": "mpegts", // output file format.
//         "-codec:v": "mpeg1video", // video codec
//         "-b:v": "1000k", // video bit rate
//         "-stats": "",
//         "-r": 25, // frame rate
//         "-s": "640x480", // video size
//         "-bf": 0,
//         // audio
//         "-codec:a": "mp2", // audio codec
//         "-ar": 44100, // sampling rate (in Hz)(in Hz)
//         "-ac": 1, // number of audio channels
//         "-b:a": "128k", // audio bit rate
//       },
//     });
//     console.log(stream.wsPort);
//   }

module.exports = Stream;
