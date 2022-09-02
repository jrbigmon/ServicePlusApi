const { Service } = require('../../../model')
const { Op } = require('sequelize')

async function getAllServicesByProfessional(professionalId, serviceStatusId = 3, date = '', price = '', order = 'ASC') {
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
    if(!services) return console.log('Empty')
    services.forEach(service => {
        console.table([
            ['date', service.serviceDate], 
            ['price', service.servicePrice], 
            ['description' , service.serviceDescription], 
            ['client name' , service.client.name], 
            ['client last name' , service.client.lastName], 
            ['client cep' , service.client.postalCode], 
            ['service status' , service.serviceStatus.name]
        ])
    })
    return console.log('finish search')
}
const professionalId = 1
const serviceStatusId = 1 
const date = '2022-08-30'  
const price = undefined 
const order = undefined 

getAllServicesByProfessional(professionalId, serviceStatusId, date, price, order)