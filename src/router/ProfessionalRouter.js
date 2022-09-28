const express = require('express')
const router = express.Router()
const ProfessionalController = require('../controller/ProfessionalController')
const verifyToken = require('../middleware/verifyToken')

router.get('/professionals/?', ProfessionalController.getProfessionalByAreaId)
router.post('/professionals', ProfessionalController.createProfessional)
router.get('/professionals/:id/profile', verifyToken, ProfessionalController.viewProfessional)
router.put('/professionals/:id', verifyToken, ProfessionalController.updateProfessional)
router.delete('/professionals/:id', verifyToken, ProfessionalController.deleteProfessional)
router.get('/professionals/:id', ProfessionalController.viewProfessional)

module.exports = router
