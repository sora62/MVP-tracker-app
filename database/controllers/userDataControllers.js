const UserData = require('../models/userDataModel');

module.exports = {
  getUserDataById: async (req, res) => {
    const { id } = req.params;
    try {
      const userData = await UserData.findOne({ userId: id });
      console.log('userData', userData);
      if (!userData) {
        const newUserData = new UserData({
          userId: id,
        });
        await newUserData.save();
        return res.status(200).send(`Create new user data successfully, ${newUserData}`);
      } else {
        return res.status(200).send(`Get user data successfully, ${userData}`);
      }
    } catch (error) {
      res.status(500).send('Failed to create user');
    }
  },
};
