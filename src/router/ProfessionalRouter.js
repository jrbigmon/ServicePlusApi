const express = require('express')
const router = express.Router()
const ProfessionalController = require('../controller/ProfessionalController')
const verifyToken = require('../middleware/verifyToken')

router.get('/professionals/:id', verifyToken, ProfessionalController.viewProfessional)
router.post('/professionals', verifyToken, ProfessionalController.createProfessional)
router.put('/professionals/:id', verifyToken, ProfessionalController.updateProfessional)
router.delete('/professionals/:id', verifyToken, ProfessionalController.deleteProfessional)

module.exports = router
