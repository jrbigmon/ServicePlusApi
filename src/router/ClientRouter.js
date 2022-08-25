const express = require('express')
const router = express.Router()
const ClientController = require('../controller/ClientController')
const verifyToken = require('../middleware/verifyToken')

router.post('/clients', ClientController.createClient)

router.use(verifyToken)
router.get('/clients/:id', ClientController.viewClient)
router.put('/clients/:id', ClientController.updateClient)
router.delete('/clients/:id', ClientController.deleteClient)

module.exports = router
