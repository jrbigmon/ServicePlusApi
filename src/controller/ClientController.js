const { Client } = require('../model/')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')

const ClientController = {
    viewClient: async (req, res) => {
        try {
            const { id } = req.params
            const client = await Client.findByPk(id)
            if(!client){
                return res.status(400).json(DefaultErrors.NotExistsInDatase)
            }
            return res.json(client)
        } catch (err){
            return res.status(500).json(DefaultErrors.DatabaseOut)

        }
    },

    createClient: async (req, res) => {
        try {
            const {
                name,
                lastName,
                cpf,
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
                cpf,
                birthday,
                postalCode,
                numberAddress,
                telephone,
                email,
                password: bcrypt.hashSync(password, 10)
            }
            const verifyIfExists = await Client.findOne({where: { email }})
            if(verifyIfExists) {
                return res.status(409).json(DefaultErrors.ExistsInDatase)
            }
            await Client.create(newClient)
            return res.status(201).json(newClient)
        } catch (err){
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    },

    updateClient: async (req, res) => {
        try {
            const { id } = req.params
            const {
                name,
                lastName,
                cpf,
                birthday,
                postalCode,
                numberAddress,
                telephone
            } = req.body
            // const { avatar } = req.file
            const verifyIfExists = await Client.findByPk(id)
            // console.log(verifyIfExists)
            if(!verifyIfExists){
                return res.status(400).json(DefaultErrors.NotExistsInDatase)
            }
            const updatedClient = {
                ...verifyIfExists,
                // avatar: avatar.file.filename || verifyIfExists.avatar,
                name: name || verifyIfExists.name,
                lastName: lastName || verifyIfExists.lastName,
                cpf: cpf || verifyIfExists.cpf,
                birthday: birthday || verifyIfExists.birthday,
                postalCode: postalCode || verifyIfExists.postalCode,
                numberAddress: numberAddress || verifyIfExists.numberAddress,
                telephone: telephone || verifyIfExists.telephone,
            }
            await Client.update(updatedClient, { where: { id }})
            return res.status(202).json(updatedClient)  
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    },

    deleteClient: async (req, res) => {
        try {
            const { id } = req.params
            const verifyIfExists = await Client.findByPk(id)
            if(!verifyIfExists){
                return res.status(400).json(DefaultErrors.NotExistsInDatase)
            }
            await Client.destroy({where: { id }})
            return res.status(204).json()
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    }
}
module.exports = ClientController