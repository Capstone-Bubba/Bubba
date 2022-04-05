const babyDAO = require('../model/babyDAO');

const readBaby = async (req, res) => {
    const parameters = {
        "user_num" : 11
    };
    
    const result = await babyDAO.read_baby(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createBaby = async (req, res) => {
    const parameters = {
        "baby_name" : req.body.baby_name,
        "birth" : req.body.birth,
        "gender" : req.body.gender,
        "baby_picture" : req.body.baby_picture,
        "user_num" : 11
    };

    console.log(parameters);

    try {
        await babyDAO.create_baby(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }    
};

const updateBaby = async (req, res) => {
    const parameters = {
        "baby_name" : req.body.baby_name,
        "birth" : req.body.birth,
        "gender" : req.body.gender,
        "baby_picture" : req.body.baby_picture,
        "user_num" : 11,
        "baby_num" : req.query.baby_num
    };
    try {
        await babyDAO.update_baby(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
};

const deleteBaby = async (req, res) => {
    console.log(typeof(req.query.baby_num))
    const parameters = {
        "baby_num" : req.query.baby_num
    };
    try {
        await babyDAO.delete_baby(parameters);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readBaby,
    createBaby,
    updateBaby,
    deleteBaby
}