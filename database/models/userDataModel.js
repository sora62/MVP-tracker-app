const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  lists: [
    {
      questionid: { type: Number, required: true, unique: true, index: true },
      title: { type: String, required: true },
      link: String,
      checkmark: { type: Boolean, default: false },
      difficulty: { type: String, required: true },
      tag: [{ type: String, required: true }],
      date: { type: Date, default: Date.now },
      code: String,
      note: String,
    },
  ],
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;