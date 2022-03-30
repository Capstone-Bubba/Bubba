const db = require('../config/dbConn');

function passportCheckGoogle(parameter) {
    return new Promise(function (resolve, reject) {
        console.log("CHeck DB");
        let queryData = `SELECT user_id, displayName, provider FROM google WHERE user_id = ?`;
        db.query(queryData, [parameter.id], function (error, db_data){
            if(error) resolve(error)
            if(db_data[0] != undefined) resolve(db_data)
            else resolve(0)
        });
    })
}

function insertGoogleUser(parameter){
    return new Promise(function (resolve, reject) {
        let queryData = `INSERT INTO Google (user_id, displayName, email, verified, email_verified, provider) VALUES (?,?,?,?,?,?)`;
        db.query(queryData, [parameter.id, parameter.displayName, parameter.email, parameter.verified, parameter.email_verified, parameter.provider], function (error, db_data){
            if (error) { reject(error) }
            if (db_data.affectedRows != 0) resolve('유저정보 입력완료')
            else reject('실패')
        })
    })
}

module.exports = {
    passportCheckGoogle,
    insertGoogleUser,
}