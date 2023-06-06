const mongoose = require('mongoose');

const problemsModel = new mongoose.Schema({
  listid: { type: Number, required: true, unique: true },
  questionid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  title_slug: { type: String, required: true },
  difficulty: { type: Number, required: true },
});

const Problem = mongoose.model('Problem', problemsModel);

module.exports = Problem;