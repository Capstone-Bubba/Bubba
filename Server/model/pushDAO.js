const db = require('../config/dbConn');

const read_push = () => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM push`;
        db.query(queryData, (err, db_data) => {
            if (err){
                console.log(err);
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
                console.log(err);
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
}