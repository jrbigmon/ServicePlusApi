const { Client } = require('../model/Client')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')

const ClientController = {
    createClient: async (req, res) => {
        const {
            name,
            lastName,
            birthday,
            postalCode,
            numberAddress,
            telephone,
            email,
            password
        } = req.body
        const newClient = {
            name,
            lastName,
            birthday,
            postalCode,
            numberAddress,
            telephone,
            email,
            password
        }
        const verifyIfExists = await Client.findOne({where: { email }})
    }
}