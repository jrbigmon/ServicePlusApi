const express = require('express')
const router = express.Router()
const AreaController = require('../controller/AreaController')

router.get('/areas', AreaController.viewAreas)
router.post('/areas', AreaController.createArea)
router.put('/areas/:id', AreaController.updateArea)
router.delete('/areas/:id', AreaController.removeArea)

module.exports = router
