const express = require('express');
const userController = require('../../database/controllers/userControllers');
const problemsController = require('../../database/controllers/problemsControllers');
const router = express.Router();

router.get('/users', userController.getAll);
router.get('/problems/titles', problemsController.getAllProblemsTitles);
router.get('/problems/:id', problemsController.getProblemById);
router.get('/problems-id/:id', problemsController.getProblemByProblemId);


module.exports = router;