const User = require('../models/userModel');
const UserData = require('../models/userDataModel');

  module.exports = {
    getAll: (req, res) => {
      res.status(200).send('Hello world');
    }
    // createUser: async (userData) => {
    //   try {
    //     const user = new User(userData);
    //     await user.save();
    //     return user;
    //   } catch (error) {
    //     throw new Error('Failed to create user');
    //   }
    // },
    // getUserById: async (userId) => {
    //   try {
    //     const user = await User.findById(userId);
    //     return user;
    //   } catch (error) {
    //     throw new Error('Failed to fetch user');
    //   }
    // }
  };
