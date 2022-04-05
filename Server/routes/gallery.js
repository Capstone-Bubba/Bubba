const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const galleryCtrl = require('../controller/galleryCtrl');

router.get('/', galleryCtrl.readGalleryList);

router.get('/detail', galleryCtrl.readGallery);

router.post('/create', uploadOriginal.uploadGallery.single('file'), galleryCtrl.createGallery);

router.post('/update', uploadOriginal.uploadGallery.single('file'), galleryCtrl.updateGallery);

router.post('/delete', galleryCtrl.deleteGallery);

module.exports = router;
