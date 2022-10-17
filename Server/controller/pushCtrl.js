const admin = require('../config/pushConn');
const authDAO = require('../model/authDAO');
const dayjs = require('dayjs');

const pushMfcc = async (req, res) => {
    const parameters = {
        "user_num" : req.body.user_num,
        "mfcc_result" : req.body.mfcc_result,
    }
    console.log(parameters);
    try{
        const tokenData = await authDAO.userToken(parameters);
        let message = {
            token : tokenData,
            notification :{
                body : "MFCC"
            },
            data : {
                content : parameters.mfcc_result
            },
            android : {
                priority : "high",
            },
        }
        console.log(message.token);
    
        admin.messaging()
            .send(message)
            .then((response) => {
                console.log("Succesfully sent message : ", response);
                // return res.status(200).json({success:true});
            })
            .catch((err) => {
                console.log("Error Sending message !!! :", err);
                // return res.status(400).json({success:false});
            })
        res.send("OK")
    } catch (err) {
        console.log(err);
    }
}

const pushFace = async (req, res) => {
    const parameters = {
        "back" : req.body.back,
        "side" : req.body.side,
        "front" : req.body.front,
        "none" : req.body.none,
        "user_num" : req.body.user
    }
    console.log(parameters);
    if(Math.max(parameters.back, parameters.side, parameters.front) == parameters.back){
        if(Math.max(parameters.back, parameters.none) == parameters.back){
                const result = "뒷면"
            try{
                const tokenData = await authDAO.userToken(parameters);
                console.log(tokenData);
                let message = {
                    token : tokenData,
                    notification :{
                        body : "Face"
                    },
                    data : {
                        content : result
                    },
                    android : {
                        priority : "high",
                    },
                }
            
                admin.messaging()
                    .send(message)
                    .then((response) => {
                        console.log("Succesfully sent message : ", response);
                        // return res.status(200).json({success:true});
                    })
                    .catch((err) => {
                        console.log("Error Sending message !!! :", err);
                        // return res.status(400).json({success:false});
                    })
                res.send("OK");
            } catch (err) {
                console.log(err);
                res.send("err");
            }
        } else{
            res.send("안전");
        }
    } else {
        res.send("값 잘못 추출");
    }
}














// const readPush = async (req, res) => {
//     const result = await pushDAO.read_push();
//     res.send({"result" : result});
// };

// const createPush = async (req, res) => {
//     const parameters = {
//         "user_num" : req.session.passport.user.user_num,
//         "push_title" : req.body.push_title,
//         "push_content" : req.body.push_content,
//     };

//     try{
//         await pushDAO.create_push(parameters);
//         res.send('/push/push_send');
//     } catch(err) {
//         console.log(err);
//     }
// };

// const androidPush = async (req, res) => {
//     const parameters = {
//         "push_num" : req.query.push_num
//     };

//     try{
//         const result = await pushDAO.read_push_num(parameters);
//         console.log(result[0].push_title);
//         res.send({"result" : result});
//     } catch(err) {
//         console.log(err);
//     }
// }

module.exports = {
    pushMfcc,
    pushFace,
    // readPush,
    // createPush,
    // androidPush,
}