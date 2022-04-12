const adminAndroid = require('firebase-admin');
let androidServiceAccount = require('../private/bubba-345616-firebase-adminsdk-araq3-1e943a59b1.json');

adminAndroid.initializeApp({
    credential: admin.credential.cert(androidServiceAccount)
  });

