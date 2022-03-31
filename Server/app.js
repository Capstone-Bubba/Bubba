const express = require('express');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const passportConfig = require('./passport/passportConfig');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

passportConfig();

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const authRouter = require('./routes/auth');

app.use(passport.initialize());
app.use(flash());

app.use('/', userRouter);
app.use('/news', noticeRouter);
app.use('/auth', authRouter);

module.exports = app;