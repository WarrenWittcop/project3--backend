const router = require('express').Router();
const userCtrl = require('./userController')
const {verifyToken} = require('../middleware/verifyToken')

// Signup
router.post('/auth/signup', userCtrl.signup)

// Login
router.post('/auth/login', userCtrl.login);

//Get and Save
router.get('/user/:id', verifyToken, userCtrl.getUser);
router.put('/user/:id', verifyToken, userCtrl.updateUser);

//Delete
router.delete('/user/:userId/:exerciseId', userCtrl.removeExercise);

//Update Exercise
router.put('/user/:userId/exercise/:exerciseId', userCtrl.updateExercise);

//Post Exercise
router.post('/exercise/:id', userCtrl.addExercise);

module.exports = router

