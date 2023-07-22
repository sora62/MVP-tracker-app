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

app.set('port', (process.env.PORT || 8080));

// Start node server
app.listen(app.get('port'), () => {
  console.log(`Node server is running on port${app.get('port')}`);
});

module.exports = app;
