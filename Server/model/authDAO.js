const db = require('../config/dbConn');

const checkUserID = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT EXISTS(SELECT user_num FROM user WHERE email = ? && platform = ?) AS exist`;
        db.query(queryData, [parameters.email, parameters.platform], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const UserState = (parameters) => {
    return new Promise((resolve, reject) => {
        // let queryData = `SELECT * FROM user, baby WHERE user.user_num=? && baby.user_num = ?`;
        const queryData = `SELECT * FROM user WHERE user_num = ?`
        // db.query(queryData, [parameters.user_num, parameters.user_num], (err, db_data) => {
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const babyState = (parameters) => {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT baby_num FROM baby WHERE user_num = ?`;
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const checkUserNum = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT user_num FROM user WHERE email =? && platform =?`;
        db.query(queryData, [parameters.email, parameters.platform], (err, db_data) => {
            if (err) {
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
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const checkAuthority = (parameters) => {
    return new Promise((resolve, reject) => {
        // let queryData = `SELECT authority FROM user WHERE user_num =?`;
        db.query(queryData, parameters.user_num, (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}
const checkBabyId = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT baby_num FROM baby WHERE user_num = ?`;
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if (err) {
                reject(err);
            } else {
                console.log(db_data)
                resolve(db_data[0])
            }
        })
    })
}

module.exports = {
    checkUserID,
    insertUser,
    checkUserNum,
    checkAuthority,
    UserState,
    checkBabyId,
    babyState
}

