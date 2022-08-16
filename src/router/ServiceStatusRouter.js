const express = require('express')
const router = express.Router()
const ServiceStatusController = require('../controller/ServiceStatusController')

router.get('/statusService', ServiceStatusController.viewServiceStatus)
router.post('/statusService', ServiceStatusController.createServiceStatus)
router.put('/statusService/:id', ServiceStatusController.updateServiceStatus)
router.delete('/statusService/:id', ServiceStatusController.removeServiceStatus)

module.exports = router