const adminAndroid = require('firebase-admin');
let androidServiceAccount = require('../private/bubba-345616-firebase-adminsdk-araq3-1e943a59b1.json');

const admin = adminAndroid.initializeApp({
    credential : adminAndroid.credential.cert(androidServiceAccount)
});

module.exports = admin;