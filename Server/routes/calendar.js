const express = require('express');
const router = express.Router();
const uploadOriginal = require('../middleware/multer');
const calendarCtrl = require('../controller/calendarCtrl');

router.get('/', calendarCtrl.readCalendar);

router.get('/detail', calendarCtrl.readCalendarDetail)

router.post('/create', uploadOriginal.uploadCalendar.array('files'), calendarCtrl.createCalendar);

router.post('/update', uploadOriginal.uploadCalendar.array('files'), calendarCtrl.updateCalendar);

router.post('/delete', calendarCtrl.deleteCalendar);

router.get('/app', calendarCtrl.readApp);

module.exports = router;