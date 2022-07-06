const Stream = require("node-rtsp-stream");

let rtspList = { "url": 'rtsp://1.228.75.150:8554/stream1', "port": 6055, "stream": null, "lastData": null }

const start = () => {
        openStream(rtspList);
        setInterval(function (obj) {
                let today = new Date();
                if (obj.lastData !== undefined) {
                        let stream_date = new Date(obj.lastData);
                        let gap = (today.getTime() - stream_date.getTime()) / 1000;

                        if (gap >= 5) {//check gap of second
                                obj.stream.stop();
                                obj.lastData = today;
                                obj.stream.mpeg1Muxer.on('ffmpegStderr', (error, data) => {
                                        let today = new Date();
                                        obj.lastData = today;

                                });
                        }
                }

        }, 1000, rtspList);

        function openStream(obj) {
                let stream;
                try {
                        stream = new Stream({
                                name: 'name',
                                streamUrl: obj.url,
                                wsPort: obj.port || 9999,
                                ffmpegOptions: { // options ffmpeg flags
                                        '-stats': '', // an option with no neccessary value uses a blank string
                                        '-r': 30, // options with required values specify the value after the key
                                }
                        });
                } catch (err) {
                        console.log("catch ", err)
                }

                obj.stream = stream;

                stream.mpeg1Muxer.on('ffmpegStderr', (data) => {
                        let today = new Date();
                        obj.lastData = today;
                });
        }
}
module.exports = {
        start,
        rtspList
}
