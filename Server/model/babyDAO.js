const db = require('../config/dbConn');

const read_babyList = (parameters) => {
    return new Promise((resolve, reject) => {
        // let queryData = `SELECT baby_name, gender, baby_picture FROM baby WHERE user_num =?`
        let queryData = `SELECT baby_num, baby_name, gender, baby_picture, birth FROM baby WHERE user_num =? ORDER BY baby_num DESC LIMIT 1`
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const read_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM baby WHERE user_num =?`;
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        }) 
    })
}

const create_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO baby SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const update_baby = (parameters) => {
    console.log(parameters);
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE baby SET baby_name =?, birth =?, gender=?, baby_picture=? WHERE baby_num =? && user_num=?`;
        db.query(queryData, [parameters.baby_name, parameters.birth, parameters.gender, parameters.baby_picture, parameters.baby_num, parameters.user_num], (err, db_data) => {
            if(err){
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    }) 
}

const delete_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `DELETE from baby where baby_num =?`;
        db.query(queryData, parameters.baby_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const userNum = (parameters) => {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT user_num FROM baby WHERE baby_num = ?`;
        db.query(queryData, [parameters.baby_num], (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    read_babyList,
    read_baby,
    create_baby,
    update_baby,
    delete_baby,
    userNum,
}