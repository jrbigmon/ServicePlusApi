const { Service } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const ServiceController = {
    viewAllServiceByClient: async (req, res) => {
       try {
        const { id: clientId } = req.params
        const services = await Service.findAll({
            where: {clientId},
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
        if(services.length === 0) return res.status(204).json()
        return res.json(services)
       } catch (err) {
        return res.status(500).json(DefaultErrors.DatabaseOut)
       }
    }
}

module.exports = ServiceController