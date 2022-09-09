const moment = require('moment')
const { Service } = require('../model')
const { Op } = require('sequelize')
const DefaultErrors = require('../Errors/DefaultErrors')

const changeStatusToCancelAutomatic = async (req, res, next) => {
    const dateNow = moment().format('YYYYMMDD')
    
    const { typeUser } = req.user
    const { id } = req.user
    
    let services
    
    if(typeUser == 'client'){
        try {
            services = await Service.findAll({
                where: {
                    serviceStatusId: { [Op.ne]: [4, 5] },
                    clientId: { id }
                }
            })
        } catch (err) {
            return res.json(500).json(DefaultErrors.DatabaseOut)
        }
    } else if(typeUser == 'professional'){ 
        try {
            services = await Service.findAll({
                where: {
                    serviceStatusId: { [Op.ne]: [4, 5] },
                    professionalId: { id }
                }
            })
        } catch (err) {
            return res.json(500).json(DefaultErrors.DatabaseOut)
        }
    }

    if(services.length < 1) {
        return next()
    }
    
    for (let service of services){
        const serviceDate = service.serviceDate

        const serviceDateFormat = moment(serviceDate, 'YYYY-MM-DD').format('YYYYMMDD')

        if(serviceDateFormat - dateNow < 0){
            const updatedService = {
                serviceDescription: 'Canceled due to deadline exceeded',
                serviceStatusId: 5
            }
            
            try {
                await Service.update(updatedService, { where: { id: service.id } }) 
            } catch (err) {
                return res.json(500).json(DefaultErrors.DatabaseOut)
            }
        }
    }

    return next()
}

module.exports = changeStatusToCancelAutomatic