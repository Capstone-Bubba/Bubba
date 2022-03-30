const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    port : 3308,
    user : "root",
    password : "Ehdguq23!",
    database : "bubba"
});

module.exports = db;