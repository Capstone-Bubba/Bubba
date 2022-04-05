const db = require('../config/dbConn');

const checkUserID = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT EXISTS(SELECT user_num FROM user WHERE email = ? && platform = ?) AS exist`;
        db.query(queryData, [parameters.email, parameters.platform], (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        }) 
    })
}

const insertUser = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO User (platform, email) VALUES (?, ?)`;
        db.query(queryData, [parameters.platform, parameters.email], (err, db_data) => {
            if(err) { 
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    checkUserID,
    insertUser,
}

