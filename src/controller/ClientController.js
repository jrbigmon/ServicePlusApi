const { Client } = require('../model/')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')

const ClientController = {
  viewClient: async (req, res) => {
    try {
      const { id } = req.params
      
      const { typeUser } = req.user
      
      if (typeUser !== 'client') return res.status(401).json(DefaultErrors.UserNotValidated)
      
      const client = await Client.findByPk(id, { 
        attributes: { exclude: ['password'] }
      })
      
      if (!client) return res.status(400).json(DefaultErrors.NotExistsInDatase)
      
      return res.json(client)
      
    } catch (err) {
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
        cpf: cpf.replace(/\./gi, '').replace(/\-/, ''),
        birthday, 
        postalCode: postalCode.replace(/\-/, ''),
        numberAddress,
        telephone: telephone.replace(/\(/, '').replace(/\)/, ''),
        email: email ? email.toLowerCase() : '',
        password: !password.trim() ? '' : bcrypt.hashSync(password, 10)
      }
      
      for (const props in newClient) {
        const propertyWithoutSpace = newClient[props].trim()
        if (!propertyWithoutSpace) return res.status(404).json(DefaultErrors.EmptyFields)
      }
      
      const verifyIfExists = await Client.findOne({ where: { [Op.or]: { email, cpf } } })
      
      if (verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)
      
      await Client.create(newClient)
      
      delete newClient.password
      
      return res.status(201).json(newClient)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  updateClient: async (req, res) => {
    try {
      const { id } = req.params
      
      const { typeUser } = req.user
      
      if (typeUser !== 'client') return res.status(401).json(DefaultErrors.UserNotValidated)
      
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
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      const updatedClient = {
        // avatar: avatar.file.filename || verifyIfExists.avatar,
        name: name || verifyIfExists.name,
        lastName: lastName || verifyIfExists.lastName,
        cpf: cpf || verifyIfExists.cpf,
        birthday: birthday || verifyIfExists.birthday,
        postalCode: postalCode || verifyIfExists.postalCode,
        numberAddress: numberAddress || verifyIfExists.numberAddress,
        telephone: telephone || verifyIfExists.telephone
      }
      
      await Client.update(updatedClient, { where: { id } })
      
      const clientAfterUpdated = await Client.findByPk(id, { 
        attributes: { exclude: ['password']}
      })
      
      return res.status(202).json(clientAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  deleteClient: async (req, res) => {
    try {
      const { id } = req.params
      
      const { typeUser } = req.user
      
      if (typeUser !== 'client') return res.status(401).json(DefaultErrors.UserNotValidated)
      
      const verifyIfExists = await Client.findByPk(id)
      
      if (!verifyIfExists) return res.status(400).json(DefaultErrors.NotExistsInDatase)
      
      await Client.destroy({ where: { id } })
      
      return res.status(204).json()
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = ClientController
