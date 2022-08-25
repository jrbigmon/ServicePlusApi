const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.use(verifyIsAdmin)
router.post('/admin', AdminController.createAdmin)
router.delete('/admin/:id', AdminController.removeAdmin)

module.exports = router
