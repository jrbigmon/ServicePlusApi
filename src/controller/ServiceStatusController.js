const { ServiceStatus } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const ServiceStatusController = {
    viewServiceStatus: async (req, res) => {
        try {
            const serviceStatus = await ServiceStatus.findAll()
            return res.json(serviceStatus)
        } catch (err){
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    },

    createServiceStatus: async (req, res) => {
        try {
            const { name } = req.body
            const verifyIfExists = await ServiceStatus.findOne({where: { name }})
            if(verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)
            const serviceStatus = await ServiceStatus.create({ name })
            return res.status(201).json(serviceStatus)
        } catch (err){
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    },

    updateServiceStatus: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            const verifyIfExists = await ServiceStatus.findOne({where: { id }})
            if(!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
            const statusServiceUpdated = await ServiceStatus.update({ name }, {where: { id }})
            return res.json(statusServiceUpdated)
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    }
}

module.exports = ServiceStatusController