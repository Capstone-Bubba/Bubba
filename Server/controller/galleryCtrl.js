const galleryDAO = require('../model/galleryDAO');

const readGalleryList = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num
    };

    const result = await galleryDAO.read_gallery(parameters);
    res.send({"result" : result});
    console.log(result);
}

const readGallery = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num
    };
    
    const result = await galleryDAO.read_gallery(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createGallery = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num,
        "gal_picture" : req.body.gal_picture,
        "gal_date" : req.body.gal_date,
        "gal_title" : req.body.gal_title,
        "gal_content" : req.body.gal_content
    };

    console.log(parameters);

    try {
        await galleryDAO.create_gallery(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

const updateGallery = async (req, res) => {
    const parameters = {
        "gal_num" : req.query.gal_num,
        "gal_picture" : req.body.gal_picture,
        "gal_date" : req.body.gal_date,
        "gal_title" : req.body.gal_title,
        "gal_content" : req.body.gal_content
    };

    console.log(parameters);

    try{
        await galleryDAO.update_gallery(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

const deleteGallery = async (req, res) => {
    const parameters = {
        "gal_num" : req.query.gal_num
    };

    try {
        await galleryDAO.delete_gallery(parameters);
        res.sendStatus(200);
    } catch(err) {
        console.log(err);
    }
};




module.exports = {
    readGalleryList,
    readGallery,
    createGallery,
    updateGallery,
    deleteGallery,
}
