const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/passportConfig');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const Session = require('./config/sessionConn');
const indexRouter = require('./routes/index');
const noticeRouter = require('./routes/notice');
const authRouter = require('./routes/auth');
const babyRouter = require('./routes/baby');
const galleryRouter = require('./routes/gallery');
const diaryRouter = require('./routes/diary');
const pushRouter = require('./routes/push');
const auth = require('./middleware/sessoinCheck');
const logger = require('./config/winston');

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

app.use(Session);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(morgan('combined', {stream: logger.stream}));

app.use('/', indexRouter);
app.use('/notice', auth.userCheck, noticeRouter);
app.use('/auth', authRouter);
app.use('/baby', auth.userCheck, babyRouter);
app.use('/gallery', auth.userCheck, galleryRouter);
app.use('/diary', auth.userCheck, diaryRouter);
app.use('/push', auth.authorityCheck, pushRouter);

module.exports = app;