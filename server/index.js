const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const db = require('../database/index');
const router = require('./routes/userRoutes');

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
