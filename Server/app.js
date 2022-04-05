const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/passportConfig');
const Session = require('./config/sessionConn');

const app = express();

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const authRouter = require('./routes/auth');
const babyRouter = require('./routes/baby');
const galleryRouter = require('./routes/gallery');
const diaryRouter = require('./routes/diary');

const auth = require('./middleware/sessoinCheck');

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

app.use(Session);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/news', noticeRouter);
// app.use('/auth', auth.sessionCheck, authRouter);
app.use('/auth', authRouter);
app.use('/baby', babyRouter);
app.use('/gallery', galleryRouter);
app.use('/diary', diaryRouter);

module.exports = app;