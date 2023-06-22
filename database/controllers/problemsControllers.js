const Problem = require('../models/problemsModel');

module.exports = {
  getAllProblemsTitles: (req, res) => {
    Problem.find({}, 'title')
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Err in get problems titles: ', err);
        res.status(500).send('Internal Server Error');
      });
  },
  getProblemById: (req, res) => {
    Problem.findById(req.params.id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Err in getProblemById: ', err);
        res.status(500).send('Internal Server Error');
      });
  },
  getProblemByProblemId: (req, res) => {
    Problem.findOne({ questionid: req.params.id })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log('Err in getProblemByProblemId: ', err);
        res.status(500).send('Internal Server Error');
      });
  },
};