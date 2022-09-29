const express = require('express')
const router = express.Router()
const ServiceController = require('../controller/ServiceController')
const verifyToken = require('../middleware/verifyToken')
const changeStatusAuto = require('../middleware/changeStatusToCancelAutomatic')

// Get services from client id
router.get('/services/client/:id', verifyToken, changeStatusAuto, ServiceController.viewAllServicesByClient)
// Get service from professional id
router.get('/services/professional/:id', verifyToken, changeStatusAuto, ServiceController.viewAllServicesByProfessional)

router.use(verifyToken)
// Request budget for service
router.post('/services/budget', ServiceController.requestBudget)
// Budgeted service in stage budget (1)
router.put('/services/:id/budgeted', ServiceController.budgeted)
// Accepet service in stage budgeted (2)
router.put('/services/:id/accept', ServiceController.acceptBudget)
// Finishe service in stage acecept (3) 
router.put('/services/:id/finish', ServiceController.finishService)
// Cancel service in stages budget(1), budgeted(2) and accepted (3)
router.put('/services/:id/cancel', ServiceController.cancelService)

module.exports = router
