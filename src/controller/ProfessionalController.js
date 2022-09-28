const { Professional, Area, sequelize, EvaluationHasProfessional } = require('../model/')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
const calcRatingProfessional = require('../util/calcRatingProfessional')

const ProfessionalController = {
  getProfessionalByAreaId: async (req, res) => {
    try {
      let { area: areaId, page } = req.query

      if(!areaId){
        const areas = await Area.findAll()
        areaId = areas.map(area => area.id)
      }

      page = page || 1
      const offset = page * 10 - 10

      const professionals = await Professional.findAll({
        where: { areaId },
        limit: 10,
        offset,
        attributes: {
          exclude: ['password', 'cpf', 'email', 'createdAt', 'updatedAt', 'deletedAt']
        },
        include: [{
          association: 'area',
          attributes: ['name']
        }]
      })

      return res.json(professionals)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  viewProfessional: async (req, res) => {
    try {
      const { id } = req.params
      
      const professional = await Professional.findByPk(id, {
        include: [
          { 
            association: 'area', 
            attributes: {
              exclude: ['password', 'email']
            }
          }
        ]
      })
      
      if (!professional) return res.status(400).json(DefaultErrors.NotExistsInDatase)

      return res.json(professional)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  createProfessional: async (req, res) => {
    try {
      const {
        name,
        lastName,
        cpf,
        birthday,
        postalCode,
        telephone,
        email,
        password,
        areaId
      } = req.body
      
      const newProfessional = {
        name, 
        lastName, 
        cpf: cpf.replace(/\./gi, '').replace(/\-/, ''), 
        birthday, 
        postalCode: postalCode.replace(/\-/, ''), 
        telephone: telephone.replace(/\(/, '').replace(/\)/, ''), 
        email: email ? email.toLowerCase() : '', 
        password: password.trim() ? bcrypt.hashSync(password, 10) : '', 
        areaId: parseInt(areaId)
      }
      
      for (const props in newProfessional) {
        typeof newProfessional[props] == "number" ? propertyWithoutSpace = newProfessional[props] : propertyWithoutSpace = newProfessional[props].trim()
        if (!propertyWithoutSpace) return res.status(400).json(DefaultErrors.EmptyFields)
      }
      
      const verifyIfExists = await Professional.findOne({ where: { [Op.or]: { email, cpf } } })
      
      if (verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)
      
      const professionalAfterCreate = await Professional.create(newProfessional)

      await EvaluationHasProfessional.create({
        professionalId: professionalAfterCreate.id,
        assessment: 0
      })

      delete newProfessional.password
      
      return res.status(201).json(newProfessional)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  updateProfessional: async (req, res) => {
    try {
      const { typeUser } = req.user
      
      if (typeUser !== 'professional') return res.status(401).json(DefaultErrors.BadRequestByUser)
      
      const { id } = req.params
      
      const { name, lastName, cpf, birthday, postalCode, telephone, aboutYou, areaId } = req.body
      // const { avatar } = req.file
      const verifyIfExists = await Professional.findByPk(id)
      
      if (!verifyIfExists) return res.status(400).json(DefaultErrors.NotExistsInDatase)
      
      const updatedProfessional = {
        // avatar: avatar.file.filename || verifyIfExists.avatar,
        name: name || verifyIfExists.name,
        lastName: lastName || verifyIfExists.lastName,
        cpf: cpf || verifyIfExists.cpf,
        birthday: birthday || verifyIfExists.birthday,
        postalCode: postalCode || verifyIfExists.postalCode,
        telephone: telephone || verifyIfExists.telephone,
        aboutYou: aboutYou || verifyIfExists.aboutYou,
        areaId: areaId || verifyIfExists.areaId
      }
      
      await Professional.update(updatedProfessional, { where: { id } })
      
      const professionalAfterUpdated = await Professional.findByPk(id, { 
        attributes: { excluede: ['password'] }
      })
      
      return res.status(202).json(professionalAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  deleteProfessional: async (req, res) => {
    try {
      const { id } = req.params
      
      const { typeUser } = req.user
      
      if (typeUser !== 'professional') return res.status(401).json(DefaultErrors.BadRequestByUser)
      
      const verifyIfExists = await Professional.findByPk(id)
      
      if (!verifyIfExists) return res.status(400).json(DefaultErrors.NotExistsInDatase)
      
      await Professional.destroy({ where: { id } })
      
      return res.status(204).json()
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = ProfessionalController
