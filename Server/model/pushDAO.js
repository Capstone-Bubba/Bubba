const db = require('../config/dbConn');

const read_push = () => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM push`;
        db.query(queryData, (err, db_data) => {
            if (err){
                reject(err);
            } else {
                resolve(db_data);
               
            }
        })
    })
};

const create_push = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO push SET ?`;
        db.query(queryData, parameters, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
};

const read_push_num = (paramerters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT push_title, push_content, createAt FROM push WHERE push_num = ?`;
        db.query(queryData, paramerters.push_num, (err, db_data) => {
            if(err) {
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

module.exports = {
    read_push,
    create_push,
    read_push_num,
}