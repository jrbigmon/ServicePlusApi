const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')

// Login process
router.post('/login?', AuthController.login)

module.exports = router
