const express = require('express')
const router = express.Router()
const ClientController = require('../controller/ClientController')
const verifyToken = require('../middleware/verifyToken')

// Create a new client
router.post('/clients', ClientController.createClient)
// View client profile 
router.get('/clients/:id', verifyToken, ClientController.viewClient)
// Update client 
router.put('/clients/:id', verifyToken, ClientController.updateClient)
// Remove client 
router.delete('/clients/:id', verifyToken, ClientController.deleteClient)

module.exports = router
