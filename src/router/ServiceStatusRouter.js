const express = require('express')
const router = express.Router()
const ServiceStatusController = require('../controller/ServiceStatusController')

router.get('/serviceStatus', ServiceStatusController.viewServiceStatus)
router.post('/serviceStatus', ServiceStatusController.createServiceStatus)
router.put('/serviceStatus/:id', ServiceStatusController.updateServiceStatus)
router.delete('/serviceStatus/:id', ServiceStatusController.removeServiceStatus)

module.exports = router
