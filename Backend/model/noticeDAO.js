const db = require('../config/dbConn');

const read_notice = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM notice`, (err, db_data) => {
            if(err) {
                reject(err);
                console.log(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const create_notice = () => {
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

module.exports = {
    read_notice,
    create_notice
}