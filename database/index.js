require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Failed to connect to the database:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
