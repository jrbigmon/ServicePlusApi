const express = require('express')
const router = express.Router()
const ServiceStatusController = require('../controller/ServiceStatusController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.get('/serviceStatus', ServiceStatusController.viewServiceStatus)

router.use(verifyIsAdmin)
router.post('/serviceStatus', ServiceStatusController.createServiceStatus)
router.put('/serviceStatus/:id', ServiceStatusController.updateServiceStatus)
router.delete('/serviceStatus/:id', ServiceStatusController.removeServiceStatus)

module.exports = router
