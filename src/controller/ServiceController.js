const { Service, Professional } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')
const { Op } = require('sequelize')

const ServiceController = {
  viewAllServicesByClient: async (req, res) => {
    try {
      const { id: clientId } = req.params
      
      const { 
        status: serviceStatusId, 
        date, 
        price,
        order 
      } = req.query
      
      serviceStatusId = serviceStatusId || 2
      date = date || ''
      price = price || ''
      order = order || 'ASC'
      
      const services = await Service.findAll({
        where: { clientId, serviceStatusId, serviceDate: { [Op.gte] : date }, servicePrice:{ [Op.gte] : price } },
        attributes: ['id', 'serviceDate', 'servicePrice', 'serviceDescription'],
        include: [
            {
                association: 'professional',
                attributes: ['id', 'name', 'lastName', 'avatar'],

                order: [['name', order]],

                include: {
                    association: 'area',
                    attributes: ['name']
                }
            },
            {
                association: 'serviceStatus',
                attributes: ['name']
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
        date, 
        price,
        order 
      } = req.query
      
      serviceStatusId = serviceStatusId || 3
      date = date || ''
      price = price || ''
      order = order || 'ASC'
      
      const services = await Service.findAll({
        where: { professionalId, serviceStatusId, servicePrice:{ [Op.gte] : price }, serviceDate: { [Op.gte] : date } },
        attributes: ['id', 'serviceDate', 'servicePrice', 'serviceDescription'],
        include: [
          {
              association: 'client',
              attributes: ['id', 'name', 'lastName', 'avatar', 'postalCode'],
              
              order: [['name', order]],
          },
          {
              association: 'serviceStatus',
              attributes: ['name']
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
      
      const newService = { clientId, professionalId: parseInt(professionalId), serviceDate, serviceDescription }
      
      for (const props in newService) {
        let propertyWithoutSpace
        typeof newService[props] == "number" ? propertyWithoutSpace = newService[props] : propertyWithoutSpace = newService[props].trim()
        if (!propertyWithoutSpace) return res.status(404).json(DefaultErrors.EmptyFields)
      }
      
      const verifyIfExists = await Professional.findByPk(parseInt(professionalId))
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
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
