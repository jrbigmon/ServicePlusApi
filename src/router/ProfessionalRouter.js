const express = require('express')
const router = express.Router()
const ProfessionalController = require('../controller/ProfessionalController')

router.get('/professionals/:id', ProfessionalController.viewProfessional)
router.post('/professionals', ProfessionalController.createProfessional)
router.put('/professionals/:id', ProfessionalController.updateProfessional)
router.delete('/professionals/:id', ProfessionalController.deleteProfessional)

module.exports = router
