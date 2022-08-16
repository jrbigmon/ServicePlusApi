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
    }
}

module.exports = ServiceStatusController