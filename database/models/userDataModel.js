const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  lists: [
    {
      title: { type: String, required: true },
      link: String,
      checkmark: { type: Boolean, default: false },
      difficulty: { type: String, required: true },
      tag: { type: String, required: true },
      code: String,
      note: { type: String },
    },
  ],
});

const UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;