const db = require('../config/dbConn');

const read_galleryList = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT gal_picture, gal_title, gal_date, gal_content FROM gallery WHERE baby_num =?`
        db.query(queryData, [parameters.baby_num], (err, db_data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
}

const read_gallery = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `SELECT * FROM gallery WHERE baby_num =?`;
        db.query(queryData, [parameters.baby_num], (err, db_data) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        }) 
    })
}

const create_gallery = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `INSERT INTO gallery SET ?`;
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

const update_gallery = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `UPDATE gallery SET gal_picture =?, gal_date =?, gal_title =?, gal_content =? WHERE gal_num =?`
        db.query(queryData, [parameters.gal_picture, parameters.gal_date, parameters.gal_title, parameters.gal_content, parameters.gal_num], (err, db_data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        });
    });
};

const delete_gallery = (parameters) => {
    return new Promise((resolve, reject) => {
        let queryData = `DELETE from gallery WHERE gal_num =?`;
        db.query(queryData, parameters.gal_num, (err, db_data) => {
            if(err) {
                console.log(err);
                reject(err);
            } else {
                resolve(db_data);
            }
        })
    })
};

module.exports = {
    read_galleryList,
    read_gallery,
    create_gallery,
    update_gallery,
    delete_gallery,
}