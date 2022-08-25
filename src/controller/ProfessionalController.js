const { Professional } = require('../model/')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')

const ProfessionalController = {
  viewProfessional: async (req, res) => {
    try {
      const { id } = req.params
      const professional = await Professional.findByPk(id, {
        include: { association: 'area', attributes: ['name'] },
        raw: true
      })
      if (!professional) return res.status(400).json(DefaultErrors.NotExistsInDatase)
      delete professional.password
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
        cpf,
        birthday,
        postalCode,
        telephone,
        email,
        password: !password.trim() ? '' : bcrypt.hashSync(password, 10),
        areaId
      }
      for (const props in newProfessional) {
        const propertyWithoutSpace = newProfessional[props].trim() 
        if (!propertyWithoutSpace) return res.status(404).json(DefaultErrors.EmptyFields)
      }
      const verifyIfExists = await Professional.findOne({ where: { [Op.or]: { email, cpf } } })
      if (verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)
      await Professional.create(newProfessional)
      delete newProfessional.password
      return res.status(201).json(newProfessional)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  updateProfessional: async (req, res) => {
    try {
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
      return res.status(202).json(updatedProfessional)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  deleteProfessional: async (req, res) => {
    try {
      const { id } = req.params
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
