const db = require('../config/dbConn');

const checkUserID = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM User WHERE user_id =?`;
        db.query(queryData, [parameters.user_id], (error, db_data) => {
            if(error){
                reject(error);
            }
            if(db_data[0] == undefined) resolve('유저정보 없음'); 
            else reject('이미 유저정보가 있음');
        }) 
    })
}

const insertUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO User (user_id, user_pw, salt, displayName) VALUES (?, ?, ?, ?)`;
        db.query(queryData, [parameters.user_id, parameters.user_pw, parameters.salt, parameters.displayName], (error, db_data) => {
            console.log('db_data : ', db_data);
            if(error) { reject(error) };
            if(db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}

const passportCheckUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT user_id, displayName FROM User Where user_id =?`;
        db.query(queryData, [parameters], (error, db_data) => {
            if(error) reject('등록되지 않은 사용자');
            else resolve(db_data[0])
        })
    })
}

module.exports = {
    checkUserID,
    insertUser,
    passportCheckUser
}

