const babyDAO = require('../model/babyDAO');

const readBabyList = async (req, res) => {
    res.sendStatus(200);
    // const parameters = {
    //     "user_num" : 12
    // };
    
    // const result = await babyDAO.read_babyList(parameters);
    // res.send({"result" : result});
    // console.log(result);
}

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
    const parameters = {
        "baby_num" : req.query.baby_num 
    };
    try {
        await babyDAO.delete_baby(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    readBabyList,
    readBaby,
    createBaby,
    updateBaby,
    deleteBaby
}