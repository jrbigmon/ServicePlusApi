const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.use(verifyIsAdmin)
// Create new admin
router.post('/admin', AdminController.createAdmin)
// Remove admin
router.delete('/admin/:id', AdminController.removeAdmin)

module.exports = router
