const authDAO = require('../model/authDAO');

const sessionCheck = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('Already Logged In');
        res.redirect('http://localhost:3001');
    } else {
        console.log('Not Logged In');
        next();
    }
}

const userCheck = (req, res, next) => {
    console.log('userCheck');
    if(req.isAuthenticated()) {
        next();
    } else {
        console.log('Not Logged In');
        res.redirect('/auth');
    }
}

const authorityCheck = async (req, res, next) => {
    console.log('authorityCheck');
    const parameters = {
        "user_num" : req.session.passport.user.user_num
    };
    const result = await authDAO.checkAuthority(parameters);
    if(result[0].authority == 1){
        next();
    } else {
        res.send('관리자 권한이 필요합니다');
    }
};

// 5가지 울음소리 0 : 배고픔, 1: 트림, 2: 복통, 3: 불편, 4: 피곤
// const stateCheck = async (req, res, next) => {
//     console.log('stateCheck');
//     const num = req.body.num;
//     console.log(num);
//     let push_title;
//     let push_content;
//     switch(num){
//         case 0:
//             push_title = "배고픔";
//             push_content = "배고픕니다";
//             break;
//         case 1:
//             push_title = "트림";
//             push_content = "트림마렵다";
//             break;
//         case 2:
//             push_title = "복통";
//             push_content = "복통마렵다";
//             break;
//         case 3:
//             push_title = "불편";
//             push_content = "불편하다";
//             break;
//         case 4:
//             push_title = "피곤";
//             push_content = "피곤하다";
//             break;
//         default:
//             push_title = req.body.push_title;
//             push_content = req.body.push_content;
//     };
//     next();
// }

module.exports = { 
    sessionCheck,
    userCheck,
    authorityCheck,
    // stateCheck,
}
