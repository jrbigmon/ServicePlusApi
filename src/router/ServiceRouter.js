const express = require('express')
const router = express.Router()
const ServiceController = require('../controller/ServiceController')
const verifyToken = require('../middleware/verifyToken')
const changeStatusAuto = require('../middleware/changeStatusToCancelAutomatic')

router.get('/services/client/:id', verifyToken, changeStatusAuto, ServiceController.viewAllServicesByClient)
router.get('/services/professional/:id', verifyToken, changeStatusAuto, ServiceController.viewAllServicesByProfessional)

router.use(verifyToken)
router.post('/services/budget', ServiceController.requestBudget)
router.put('/services/:id/budgeted', ServiceController.budgeted)
router.put('/services/:id/accept', ServiceController.acceptBudget)
router.put('/services/:id/finish', ServiceController.finishService)
router.put('/services/:id/cancel', ServiceController.cancelService)

module.exports = router
