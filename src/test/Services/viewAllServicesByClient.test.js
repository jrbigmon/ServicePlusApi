const { Service } = require('../../model')
const { Op } = require('sequelize')

// Test to - Get service by status service and clientId 
async function getServicesByClientId (clientId, serviceStatusId = 2, date = '', price = '', order = 'ASC') {
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
    if(!services) return console.log('Empty')
    services.forEach(service => {
        console.table([
            ['date', service.serviceDate], 
            ['price', service.servicePrice], 
            ['description' , service.serviceDescription], 
            ['professional avatar' , service.professional.avatar], 
            ['professional name' , service.professional.name], 
            ['professional last name' , service.professional.lastName], 
            ['professional area' , service.professional.area.name], 
            ['service status' , service.serviceStatus.name]
        ])
    })
    return console.log('finish search')
}
const clientId = 2
const serviceStatusId = 1 
const date = '2022-08-15'  
const price = undefined 
const order = 'DESC' 

getServicesByClientId(clientId, serviceStatusId, date, price, order)

