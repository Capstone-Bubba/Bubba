const db = require('../config/dbConn');

const read_notice_list = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT notice_num, notice_title, createAt, writer, views FROM notice`, (err ,db_data) => {
            if(err) {
                reject(err);
                console.log(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const read_notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM notice WHERE notice_num = ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
                console.log(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO notice SET ?`, parameters, (err, db_data) => {
            if(err) {
                reject(err);
                console.log(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const update_notice = (parameters) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE notice SET notice_title = ?, notice_content = ? WHERE notice_num = ?`, [parameters.notice_title, parameters.notice_content, parameters.notice_num], (err, db_data) => {
            if(err) {
                reject(err);
                console.log(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    read_notice_list,
    read_notice,
    create_notice,
    update_notice
}