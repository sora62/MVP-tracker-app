const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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

      // User authenticated, create a session (e.g., using JWT)
      // Generate and send a token in the response
      // ...

      res.status(201).send({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
      res.status(500).send('Login failed');
    }
  }
};
