const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./src/routes/authentication');
const whatsappRouter = require('./src/routes/notification');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/authentication', authRouter);
app.use('/api/whatsapp', whatsappRouter);

module.exports = app;
