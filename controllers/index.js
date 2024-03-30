const router = require('express').Router();
const userCtrl = require('./userController')
const {verifyToken} = require('../middleware/verifyToken')

// Signup
router.post('/signup', userCtrl.signup)

// Login
router.post('/login', userCtrl.login)
router.get('/user/:id', verifyToken, userCtrl.getUser)

module.exports = router

