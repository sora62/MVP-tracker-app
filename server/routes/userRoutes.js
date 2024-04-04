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

router.get('/users/:id', userDataController.getUserDataByUserId);
router.get('/demo', userDataController.getDemoAcc);
router.post('/users/:id/lists', userDataController.addProblemsToLists);
router.put('/users/:id/lists/delete', userDataController.deleteProblem);
router.put('/users/:id/lists/checkmark', userDataController.updateCheckmark);
router.put('/users/:id/lists/note', userDataController.updateNote);
router.put('/users/:id/lists/code', userDataController.updateCode);

module.exports = router;
