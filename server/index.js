const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/mongodb');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));
//app.use('/api', router);

module.exports = app;