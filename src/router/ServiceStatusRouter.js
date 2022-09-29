const express = require('express')
const router = express.Router()
const ServiceStatusController = require('../controller/ServiceStatusController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

// To admin modify service status
router.get('/serviceStatus', ServiceStatusController.viewServiceStatus)
router.post('/serviceStatus', verifyIsAdmin, ServiceStatusController.createServiceStatus)
router.put('/serviceStatus/:id', verifyIsAdmin, ServiceStatusController.updateServiceStatus)
router.delete('/serviceStatus/:id', verifyIsAdmin, ServiceStatusController.removeServiceStatus)

module.exports = router
