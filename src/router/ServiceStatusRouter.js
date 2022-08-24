const express = require('express')
const router = express.Router()
const ServiceStatusController = require('../controller/ServiceStatusController')
const verifyToken = require('../middleware/verifyToken')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.get('/serviceStatus', verifyToken, ServiceStatusController.viewServiceStatus)

router.use(verifyIsAdmin)
router.post('/serviceStatus', ServiceStatusController.createServiceStatus)
router.put('/serviceStatus/:id', ServiceStatusController.updateServiceStatus)
router.delete('/serviceStatus/:id', ServiceStatusController.removeServiceStatus)

module.exports = router
