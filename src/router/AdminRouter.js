const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')

router.post('/admin', AdminController.createAdmin)
router.delete('/admin/:id', AdminController.removeAdmin)

module.exports = router
