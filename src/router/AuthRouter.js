const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const verifyToken = require('../middleware/verifyToken')

router.post('/login?user', verifyToken, AuthController.login)

module.exports = router
