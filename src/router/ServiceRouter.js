const express = require('express')
const router = express.Router()
const ServiceController = require('../controller/ServiceController')
const verifyToken = require('../middleware/verifyToken')

router.get('/services/client/:id', verifyToken, ServiceController.viewAllServicesByClient)
// router.post('/services/client/:id', verifyToken, ServiceController.viewAllServicesByClient)
router.get('/services/professional/:id', verifyToken, ServiceController.viewAllServicesByProfessional)
// router.post('/services/professional/:id', verifyToken, ServiceController.viewAllServicesByProfessional)
router.post('/services/budget', verifyToken, ServiceController.requestBudget)
router.put('/services/:id/budgeted', verifyToken, ServiceController.budgeted)
router.put('/services/:id/accept', verifyToken, ServiceController.acceptBudget)
router.put('/services/:id/finish', verifyToken, ServiceController.finishService)
router.put('/services/:id/cancel', verifyToken, ServiceController.cancelService)

module.exports = router
