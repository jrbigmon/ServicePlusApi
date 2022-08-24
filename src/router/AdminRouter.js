const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.post('/admin', verifyIsAdmin, AdminController.createAdmin)
router.delete('/admin/:id', verifyIsAdmin, AdminController.removeAdmin)

module.exports = router
