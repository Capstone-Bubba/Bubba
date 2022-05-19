const multer = require('multer');

const babyProfile = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/images/baby');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const forGallery = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/gallery');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const forCalendar = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/images/calendar');
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const uploadBaby = multer({ storage : babyProfile });
const uploadGallery = multer({ storage : forGallery});
const uploadCalendar = multer({ storage : forCalendar});

module.exports = {
    uploadBaby,
    uploadGallery,
    uploadCalendar,
}
