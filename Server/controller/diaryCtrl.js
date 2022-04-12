const diaryDAO = require('../model/diaryDAO');
let dayjs = require('dayjs');

const readDiary = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num
    };

    const result = await diaryDAO.read_diary(parameters);
    res.send({"result" : result});
    console.log(result);
}

const createDiary = async (req, res) => {
    let date = dayjs(req.body.diary_date);
    let diary_date = date.format('YYYY-MM-DD');
    let files = req.files;
    let str = "";

    for(let k in files){
        console.log(k + " : " + files[k].filename);
        str += files[k].filename + ",";
    };

    diary_picture = str.slice(0, -1);

    const parameters = {
        "baby_num" : req.query.baby_num,
        "diary_date" : diary_date,
        "diary_title" : req.body.diary_title,
        "diary_content" : req.body.diary_content,
        "diary_picture" : diary_picture
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
    let date = dayjs(req.body.diary_date);
    let diary_date = date.format('YYYY-MM-DD');
    let files = req.files;
    let str = "";
    
    for(let k in files){
        console.log(k + " : " + files[k].filename);
        str += files[k].filename + ",";
    };

    diary_picture = str.slice(0, -1);

    const parameters = {
        "diary_num" : req.query.diary_num,
        "diary_date" : diary_date,
        "diary_title" : req.body.diary_title,
        "diary_content" : req.body.diary_content,
        "diary_picture" : diary_picture
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