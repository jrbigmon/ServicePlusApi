const express = require('express')
const router = express.Router()
const ClientController = require('../controller/ClientController')
const verifyToken = require('../middleware/verifyToken')

router.post('/clients', ClientController.createClient)
router.get('/clients/:id', verifyToken, ClientController.viewClient)
router.put('/clients/:id', verifyToken, ClientController.updateClient)
router.delete('/clients/:id', verifyToken, ClientController.deleteClient)

module.exports = router
