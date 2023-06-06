require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then(() => console.log('Connected to the database'))
  .catch(err => console.log('Failed to connect to the database: ', err));

module.exports = db;