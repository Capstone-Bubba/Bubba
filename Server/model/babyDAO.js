const db = require('../config/dbConn');

const read_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM baby WHERE user_num =?`;
        db.query(queryData, [parameters.user_num], (err, db_data) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        }) 
    })
}

const create_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO notice SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const update_baby = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE baby SET baby_name =?, birth =?, gender=?, baby_picture=? WHERE baby_num =? AND user_num=?`;
        db.query(queryData, [parameters.baby_name, parameters.birth, parameters.gender, parameters.baby_picture, parameters.baby_num, parameters.user_num], (err, db_data) => {
            if(err){
                console.log(err);
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
        db.query(queryData, parameters, (err, db_data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    read_baby,
    create_baby,
    update_baby,
    delete_baby
}