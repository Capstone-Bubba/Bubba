const express = require('express');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/passportConfig');
const session = require('express-session');

const sessionStore = require('./config/sessionConn');

const app = express();

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

app.use(session({
    secret: "bubba",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/news', noticeRouter);
app.use('/auth', authRouter);

module.exports = app;