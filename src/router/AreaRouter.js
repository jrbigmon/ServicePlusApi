const express = require('express')
const router = express.Router()
const AreaController = require('../controller/AreaController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

// View all areas
router.get('/areas', AreaController.viewAreas)
// Create a new area
router.post('/areas', verifyIsAdmin, AreaController.createArea)
// Update a area
router.put('/areas/:id', verifyIsAdmin, AreaController.updateArea)
// Remove a area
router.delete('/areas/:id', verifyIsAdmin, AreaController.removeArea)

module.exports = router
