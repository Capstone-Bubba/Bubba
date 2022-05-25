const db = require('../config/dbConn');

const read_calendar = (parameters) => {
    console.log(parameters)
    return new Promise((resolve, reject) => {
        let queryData = `SELECT calendar_num, calendar_date, calendar_title, calendar_content FROM calendar WHERE baby_num=?`;
        db.query(queryData, [parameters.baby_num], (err, db_data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_calendar = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO calendar SET ?`;
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

const update_calendar = (parameters) => {
    console.log(parameters);
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE calendar SET calendar_date =?, calendar_title =?, calendar_content =?, calendar_picture =? WHERE calendar_num =?`;
        db.query(queryData, [parameters.calendar_date, parameters.calendar_title, parameters.calendar_content, parameters.calendar_picture, parameters.calendar_num], (err, db_data) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    }) 
}

const delete_calendar = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `DELETE from calendar where calendar_num =?`;
        db.query(queryData, parameters.calendar_num, (err, db_data) => {
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
    read_calendar,
    create_calendar,
    update_calendar,
    delete_calendar,
}