const express = require('express');
const path = require('path');
const Session = require('./config/SessionConn');
const passport = require('passport');
const flash = require('connect-flash');
const passportConfig = require('./passport/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

app.use(Session);

passportConfig();

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const authRouter = require('./routes/auth');

app.use('/', userRouter);
app.use('/news', noticeRouter);
app.use('/auth', authRouter);

module.exports = app;