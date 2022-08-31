const express = require('express')
const router = express.Router()
const AreaController = require('../controller/AreaController')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.get('/areas', AreaController.viewAreas)
router.post('/areas', verifyIsAdmin, AreaController.createArea)
router.put('/areas/:id', verifyIsAdmin, AreaController.updateArea)
router.delete('/areas/:id', verifyIsAdmin, AreaController.removeArea)

module.exports = router
