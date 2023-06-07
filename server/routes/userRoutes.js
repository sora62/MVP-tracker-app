const express = require('express');
const userController = require('../../database/controllers/userControllers');
const userDataController = require('../../database/controllers/userDataControllers');
const problemsController = require('../../database/controllers/problemsControllers');
const router = express.Router();

router.get('/problems/titles', problemsController.getAllProblemsTitles);
router.get('/problems/:id', problemsController.getProblemById);
router.get('/problems-id/:id', problemsController.getProblemByProblemId);

router.post('/register', userController.createNewUser);
router.post('/login', userController.userLogin);

router.get('/users/:id', userDataController.getUserDataById);



module.exports = router;