const { Service, Professional } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')
const { Op } = require('sequelize')

const ServiceController = {
  viewAllServicesByClient: async (req, res) => {
    try {
      const { id: clientId } = req.params
      
      const { 
        status: serviceStatusId, 
        date: serviceDate, 
        price: servicePrice,
        order 
      } = req.query
      
      serviceStatusId = serviceStatusId || 3
      serviceDate = serviceDate || ''
      servicePrice = servicePrice || ''
      order = order || 'ASC'
      
      const services = await Service.findAll({
        where: { clientId, serviceStatusId, servicePrice, serviceDate: { [Op.gt] : serviceDate } },
        include: [
          {
            association: 'serviceStatus',
            attributes: ['name']
          },
          {
            association: 'professional',
            attributes: ['name', 'lastName', 'avatar', 'areaId'],
            order: [['name', order]],
            include: {
              association: 'area',
              attributes: ['name']
            }
          }
        ]
      })
      
      return res.json(services)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  viewAllServicesByProfessional: async (req, res) => {
    try {
      const { id: professionalId } = req.params
      
      const { 
        status: serviceStatusId, 
        date: serviceDate, 
        price: servicePrice,
        order 
      } = req.query
      
      serviceStatusId = serviceStatusId || 3
      serviceDate = serviceDate || ''
      servicePrice = servicePrice || ''
      order = order || 'ASC'
      
      const services = await Service.findAll({
        where: { professionalId, serviceStatusId, servicePrice, serviceDate: { [Op.gt] : serviceDate }  },
        include: [
          {
            association: 'serviceStatus',
            attributes: ['name']
          },
          {
            association: 'client',
            attributes: ['avatar', 'name', 'lastName', 'cep', 'numberAddress'],
            order: [['name', order]],
          }
        ]
      })
      
      return res.json(services)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  requestBudget: async (req, res) => {
    try {
      const { id: clientId } = req.user

      const { professionalId, serviceDate, serviceDescription } = req.body

      const verifyIfExists = await Professional.findByPk(parseInt(professionalId))
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      const newService = { clientId, professionalId: parseInt(professionalId), serviceDate, serviceDescription }
      
      for (const props in newService) {
        let propertyWithoutSpace
        typeof newService[props] == "number" ? propertyWithoutSpace = newService[props] : propertyWithoutSpace = newService[props].trim()
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
     
      if (!servicePrice) return res.status(404).json(DefaultErrors.EmptyFields)
      
      const service = await Service.findByPk(parseInt(id))
     
      if (!service) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      if (service.serviceStatusId !== 1) return res.status(400).json(DefaultErrors.BadRequestByUser)
      
      const serviceUpdated = {
        servicePrice: parseFloat(servicePrice),
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
