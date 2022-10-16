const e = require('connect-flash');
const db = require('../config/dbConn');

const UserState = (parameters) => {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT * FROM user WHERE user_num = ?`
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_log = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT IGNORE INTO facelog SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const accur_log = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT IGNORE INTO accuracy set user_num=?, side=?, back=?, front=?, none=?, accur_time=?`;
        db.query(queryData, [parameters.user_num, parameters.side, parameters.back, parameters.front, parameters.none, parameters.accur_time], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })

    })
}

const user_accur = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM accuracy WHERE user_num=? ORDER BY accur_time DESC LIMIT 3`;
        db.query(queryData, parameters.user_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const ReadMFCC = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT mfcc_result, accur_time FROM mfccinfo WHERE user_num=? ORDER BY accur_time DESC LIMIT 20`;
        db.query(queryData, parameters.user_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const OnceMfcc = (paramters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT mfcc_result, accur_time FROM mfccinfo WHERE user_num=? ORDER BY accur_time DESC LIMIT 20`;
        db.query(queryData, paramters.user_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    create_log,
    accur_log,
    user_accur,
    ReadMFCC,
    OnceMfcc,
}