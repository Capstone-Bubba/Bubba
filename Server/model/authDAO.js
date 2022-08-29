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
        let queryData = `INSERT INTO User (platform, email, deviceToken, rtsp) VALUES (?, ?, ?, ?)`;
        db.query(queryData, [parameters.platform, parameters.email, parameters.deviceToken, parameters.rtsp], (err, db_data) => {
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
        let queryData = `SELECT authority FROM user WHERE user_num =?`;
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
                resolve(db_data[0])
            }
        })
    })
}

const checkAllUser = () => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM user`;
        db.query(queryData, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const ReadDeviceToken = () => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT deviceToken FROM user where deviceToken is NOT NULL`;
        // let queryData = `SELECT deviceToken FROM user`;
        db.query(queryData, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data[0].deviceToken);
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
    babyState,
    checkAllUser,
    ReadDeviceToken,
}

