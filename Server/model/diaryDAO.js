const db = require('../config/dbConn');

const read_diary = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM diary WHERE baby_num=?`;
        db.query(queryData, [parameters.diary_num], (err, db_data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_diary = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO diary SET ?`;
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

const update_diary = (parameters) => {
    console.log(parameters);
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE diary SET diary_date =?, diary_title =?, diary_content =?, diary_picture =? WHERE diary_num =?`;
        db.query(queryData, [parameters.diary_date, parameters.diary_title, parameters.diary_content, parameters.diary_picture, parameters.diary_num], (err, db_data) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    }) 
}

const delete_diary = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `DELETE from diary where diary_num =?`;
        db.query(queryData, parameters.diary_num, (err, db_data) => {
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
    read_diary,
    create_diary,
    update_diary,
    delete_diary,
}