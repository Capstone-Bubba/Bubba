const diaryDAO = require('../model/diaryDAO');

const readDiary = async (req, res) => {
    const parameters = {
        "diary_num" : req.query.diary_num
    };

    const result = await diaryDAO.read_diary(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createDiary = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num,
        "diary_date" : req.body.diary_date,
        "diary_title" : req.body.diary_title,
        "diary_content" : req.body.diary_content,
        "diary_picture" : req.body.diary_picture
    };
    console.log(parameters);
    try{
        await diaryDAO.create_diary(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
}

const updateDiary = async (req, res) => {
    const parameters = {
        "diary_num" : req.query.diary_num,
        "diary_date" : req.body.diary_date,
        "diary_title" : req.body.diary_title,
        "diary_content" : req.body.diary_content,
        "diary_picture" : req.body.diary_picture
    };
    try {
        await diaryDAO.update_diary(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
};

const deleteDiary = async (req, res) => {
    const parameters = {
        "diary_num" : req.query.diary_num 
    };
    try {
        await diaryDAO.delete_diary(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    readDiary,
    createDiary,
    updateDiary,
    deleteDiary,
}