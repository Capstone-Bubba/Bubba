const multer = require('multer');

const babyProfile = multer.diskStorage({
    destination(req, file, cb){
        cb(null, '/public/images/baby');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const forGallery = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/public/images/gallery');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const forDiary = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/public/images/diary');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const uploadBaby = multer({ storage : babyProfile });
const uploadGallery = multer({ storage : forGallery});
const uploadDiary = multer({ storage : forDiary});

module.exports = {
    uploadBaby,
    uploadGallery,
    uploadDiary
}
