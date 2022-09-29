const express = require('express')
const router = express.Router()
const ProfessionalController = require('../controller/ProfessionalController')
const verifyToken = require('../middleware/verifyToken')

// Get professionals by id of area
router.get('/professionals/?', ProfessionalController.getProfessionalsByAreaId)
// Get professionals 
router.post('/professionals', ProfessionalController.createProfessional)
// View professional details open 
router.get('/professionals/:id', ProfessionalController.viewProfessional)
// View professional profile private details
router.get('/professionals/:id/profile', verifyToken, ProfessionalController.professionalProfile)
// Upodate professional
router.put('/professionals/:id', verifyToken, ProfessionalController.updateProfessional)
// Delete professional
router.delete('/professionals/:id', verifyToken, ProfessionalController.deleteProfessional)

module.exports = router
