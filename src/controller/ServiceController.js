const { Service, Professional } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const ServiceController = {
  viewAllServicesByClient: async (req, res) => {
    try {
      const { id: clientId } = req.params
      
      const { serviceStatusId } = req.body
      !serviceStatusId ? serviceStatusId = 2 : ''
      
      const services = await Service.findAll({
        where: { clientId, serviceStatusId },
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
      
      const { serviceStatusId } = req.body
      
      !serviceStatusId ? serviceStatusId = 3 : ''
      
      const services = await Service.findAll({
        where: { professionalId, serviceStatusId },
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
  },

  requestBudget: async (req, res) => {
    try {
      const { clientId, professionalId, serviceDate, serviceDescription } = req.body
      
      const verifyIfExists = await Professional.findByPk(professionalId)
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      const newService = { clientId, professionalId, serviceDate, serviceDescription }
      
      for (const props in newService) {
        const propertyWithoutSpace = newService[props].trim()
        if (!propertyWithoutSpace) return res.status(404).json(DefaultErrors.EmptyFields)
      }
      
      await Service.create(newService)
      
      return res.status(201).json(newService)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  budgeted: async (req, res) => {
    try {
      const { id } = req.params
      
      const { servicePrice } = req.body
      
      const service = await Service.findByPk(id)
      
      if (!service) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      if (service.serviceStatusId !== 1 || !servicePrice) return res.status(400).json(DefaultErrors.BadRequestByUser)
      
      const serviceUpdated = {
        servicePrice,
        serviceStatusId: 2
      }
      
      await Service.update(serviceUpdated, { where: { id } })
      
      const serviceAfterUpdated = await Service.findByPk(id)
      
      return res.json(serviceAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  acceptBudget: async (req, res) => {
    try {
      const { id } = req.params
      
      const service = await Service.findByPk(id)
      
      if (!service) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      if (service.serviceStatusId !== 2) return res.status(400).json(DefaultErrors.BadRequestByUser)
      const serviceUpdated = {
        serviceStatusId: 3
      }
      
      await Service.update(serviceUpdated, { where: { id } })
      
      const serviceAfterUpdated = await Service.findByPk(id)
      
      return res.json(serviceAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  finishService: async (req, res) => {
    try {
      const { id } = req.params
      
      const service = await Service.findByPk(id)
      
      if (!service) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      if (service.serviceStatusId !== 3) return res.status(400).json(DefaultErrors.BadRequestByUser)
      
      const serviceUpdated = {
        serviceStatusId: 4
      }
      
      await Service.update(serviceUpdated, { where: { id } })
      
      const serviceAfterUpdated = await Service.findByPk(id)
      
      return res.json(serviceAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  cancelService: async (req, res) => {
    try {
      const { id } = req.params
      
      const service = await Service.findByPk(id)
      
      if (!service) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      if (service.serviceStatusId == 4 || service.serviceStatusId == 5) return res.status(400).json(DefaultErrors.BadRequestByUser)
      
      const serviceUpdated = {
        serviceStatusId: 5
      }
      
      await Service.update(serviceUpdated, { where: { id } })
      
      const serviceAfterUpdated = await Service.findByPk(id)
      
      return res.json(serviceAfterUpdated)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = ServiceController
