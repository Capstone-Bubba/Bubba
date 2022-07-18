const calendarDAO = require('../model/calendarDAO');
let dayjs = require('dayjs');

const readCalendar = async (req, res) => {
    const parameters = {
        "baby_num" : req.query.baby_num
    };
    const result = await calendarDAO.read_calendar(parameters);
    res.send({"result" : result});
}

const readCalendarDetail = async (req, res) => {
    const parameters = {
        "calendar_num" : req.query.num
    }
    const result = await calendarDAO.read_calendar_detail(parameters);
    res.send({"result" : result});
}
const createCalendar = async (req, res) => {
    let date = dayjs(req.body.calendar_date);
    let calendar_date = date.format('YYYY-MM-DD');
    let files = req.files;
    let str = "";

    for(let k in files){
        str += files[k].filename + ",";
    };

    calendar_picture = str.slice(0, -1);

    const parameters = {
        "baby_num" : req.query.baby_num,
        "calendar_date" : calendar_date,
        "calendar_title" : req.body.calendar_title,
        "calendar_content" : req.body.calendar_content,
        "calendar_picture" : calendar_picture
    };

    try{
        await calendarDAO.create_calendar(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
}

const updateCalendar = async (req, res) => {
    let date = dayjs(req.body.calendar_date);
    let calendar_date = date.format('YYYY-MM-DD');
    let files = req.files;
    let str = "";
    
    for(let k in files){
        str += files[k].filename + ",";
    };

    calendar_picture = str.slice(0, -1);

    const parameters = {
        "calendar_num" : req.query.calendar_num,
        "calendar_date" : calendar_date,
        "calendar_title" : req.body.calendar_title,
        "calendar_content" : req.body.calendar_content,
        "calendar_picture" : calendar_picture
    };
    try {
        await calendarDAO.update_calendar(parameters);
        res.sendStatus(200);
    } catch (err){
        console.log(err);
    }
};

const deleteCalendar = async (req, res) => {
    const parameters = {
        "calendar_num" : req.query.calendar_num 
    };
    try {
        await calendarDAO.delete_calendar(parameters);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};

const readApp = async (req, res) => {
    let obj = new Object();
    const parameters = {
        "baby_num" : req.query.baby_num
    };
    const results = await calendarDAO.read_calendar(parameters);
    const raw_keys = results.map((data) => {
        return data.calendar_date = dayjs(data.calendar_date).format('YYYY-MM-DD');
    })

    const keys = [...new Set(raw_keys)];
    console.log(keys);
    const result = {}

    keys.forEach(dateEl => {
        let raw = [];
        results.forEach(el => {
            console.log(dateEl + " " + el.calendar_date);
            if(dateEl === el.calendar_date) {
                raw.push(el);
                result[dateEl] = raw;
            }
        })
    })

    // console.log(result);
    res.send({"result":result});
}


module.exports = {
    readCalendar,
    createCalendar,
    updateCalendar,
    deleteCalendar,
    readCalendarDetail,
    readApp
}