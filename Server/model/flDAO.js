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
        let queryData = `INSERT INTO facelog SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    create_log
}