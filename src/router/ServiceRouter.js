const express = require('express')
const router = express.Router()
const ServiceController = require('../controller/ServiceController')
const verifyToken = require('../middleware/verifyToken')

router.use(verifyToken)
router.get('/services/client/:id', verifyToken, ServiceController.viewAllServicesByClient)
router.post('/services/client/:id', verifyToken, ServiceController.viewAllServicesByClient)
router.get('/services/professional/:id', verifyToken, ServiceController.viewAllServicesByProfessional)
router.post('/services/professional/:id', verifyToken, ServiceController.viewAllServicesByProfessional)
router.post('/services/budget', ServiceController.requestBudget)
router.put('/services/:id/budgeted', ServiceController.budgeted)
router.put('/services/:id/accept', ServiceController.acceptBudget)
router.put('/services/:id/finish', ServiceController.finishService)
router.put('/services/:id/cancel', ServiceController.cancelService)

module.exports = router
