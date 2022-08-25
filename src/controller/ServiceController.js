const { Service } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const ServiceController = {
  viewAllServicesByClient: async (req, res) => {
    try {
      const { id: clientId } = req.params
      const services = await Service.findAll({
        where: { clientId },
        include: [
          {
            association: 'serviceStatus',
            attributes: ['name']
          },
          {
            association: 'professional',
            attributes: ['name', 'lastName', 'avatar', 'areaId'],
            include: {
              association: 'area',
              attributes: ['name']
            }
          }
        ]
      })
      if (services.length === 0) return res.status(204).json()
      return res.json(services)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  viewAllServicesByProfessional: async (req, res) => {
    try {
      const { id: professionalId } = req.params
      const services = await Service.findAll({
        where: { professionalId },
        include: [
          {
            association: 'serviceStatus',
            attributes: ['name']
          },
          {
            association: 'client',
            attributes: ['avatar', 'name', 'lastName', 'cep', 'numberAddress']
          }
        ]
      })
      if (services.length === 0) return res.status(204).json()
      return res.json(services)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = ServiceController
