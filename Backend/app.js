const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(express.static(path.join(__dirname)));

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');

app.use('/', userRouter);
app.use('/news', noticeRouter);

module.exports = app;
