const UserData = require('../models/userDataModel');

module.exports = {
  getUserDataByUserId: async (req, res) => {
    const { id } = req.params;
    const { searchQuery } = req.query;
    try {
      const userData = await UserData.findOne({ userId: id });
      if (!userData) {
        const newUserData = new UserData({
          userId: id,
        });
        await newUserData.save();
        return res.status(200).send(newUserData);
      } if (!searchQuery) {
        return res.status(200).send(userData);
      }
      // find matching searchQuery in the title of each item of userData.lists
      const matchingItems = userData.lists.filter((item) => item.title.toLocaleLowerCase()
        .includes(searchQuery));
      return res.status(200).send(matchingItems);
    } catch (error) {
      res.status(500).send('Failed to create user');
    }
  },

  getDemoAcc: async (req, res) => {
    try {
      const demoAcc = await UserData.findOne({ userId: process.env.DEMOID });
      res.status(200).send(demoAcc);
    } catch (error) {
      res.status(500).send('Failed to login guest');
    }
  },

  addProblemsToLists: async (req, res) => {
    const { id } = req.params;
    const {
      questionid, title, title_slug, level, tag,
    } = req.body;
    try {
      const userData = await UserData.findOne({ userId: id });
      if (userData) {
        // Check if the problem already exists in the lists array
        const problemExists = userData.lists.some((problem) => problem.questionid === questionid);
        if (problemExists) {
          return res.status(400).send('Problem already exists in the list');
        }
        let convertedLevel = '';
        if (level === 1) {
          convertedLevel = 'Easy';
        } else if (level === 2) {
          convertedLevel = 'Medium';
        } else if (level === 3) {
          convertedLevel = 'Hard';
        }
        const newProblem = {
          questionid,
          title,
          link: `https://leetcode.com/problems/${title_slug}`,
          checkmark: false,
          difficulty: convertedLevel,
          tag,
          data: Date.now,
          code: '',
          note: '',
        };
        userData.lists.push(newProblem);
        await userData.save();
        res.status(201).send(`Successfully add problem to list. ${newProblem}`);
      } else {
        res.status(404).send('User data not found');
      }
    } catch (error) {
      res.status(500).send('Failed to create user');
    }
  },

  deleteProblem: async (req, res) => {
    const { id, index } = req.body;
    try {
      const userData = await UserData.findById(id);
      if (userData) {
        userData.lists.splice(index, 1); // Delete the problem object at this index
        await userData.save();
        res.status(201).send('Successfully deleted!');
      }
    } catch (error) {
      res.status(500).send('Failed to update checkmark');
    }
  },

  updateCheckmark: async (req, res) => {
    const { id, checkmark, index } = req.body;
    try {
      const userData = await UserData.findById(id);
      if (userData) {
        userData.lists[index].checkmark = checkmark;
        await userData.save();
        res.status(200).send('Successfully updated checkmark!');
      }
    } catch (error) {
      res.status(500).send('Failed to update checkmark');
    }
  },

  updateNote: async (req, res) => {
    const { id, note, index } = req.body;
    try {
      const userData = await UserData.findById(id);
      if (userData) {
        userData.lists[index].note = note;
        await userData.save();
        res.status(200).send('Successfully updated note!');
      }
    } catch (error) {
      res.status(500).send('Failed to update note');
    }
  },

  updateCode: async (req, res) => {
    const { id, code, index } = req.body;
    try {
      const userData = await UserData.findById(id);
      if (userData) {
        userData.lists[index].code = code;
        await userData.save();
        res.status(200).send('Successfully updated code!');
      }
    } catch (error) {
      res.status(500).send('Failed to update code');
    }
  },
};
