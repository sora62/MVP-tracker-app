const User = require('../models/userModel');
const UserData = require('../models/userDataModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  createNewUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(401).send('Email address already in use');
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      console.log('user: ', newUser);
      await newUser.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send('Failed to create user');
    }
  },
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send('The email you entered isn\'t connected to an account.');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('The password you\'ve entered is incorrect.');
      }

      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

      const userData = await UserData.findOne({ userId: user._id });
      res.status(201).send({ userData: userData, id: user._id, token: token });
    } catch (error) {
      res.status(500).send('Login failed');
    }
  },
};
