const multer = require('multer');

const babyProfile = multer.diskStorage({
    destination(req, file, cb){
        cb(null, '/public/images/baby');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const uploadBaby = multer({ storage : babyProfile });

module.exports = {
    uploadBaby,
}
