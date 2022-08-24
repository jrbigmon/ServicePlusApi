const express = require('express')
const router = express.Router()
const AreaController = require('../controller/AreaController')
const verifyToken = require('../middleware/verifyToken')
const verifyIsAdmin = require('../middleware/verifyIsAdmin')

router.get('/areas', verifyToken, AreaController.viewAreas)

router.use(verifyIsAdmin)
router.post('/areas', AreaController.createArea)
router.put('/areas/:id', AreaController.updateArea)
router.delete('/areas/:id', AreaController.removeArea)

module.exports = router
