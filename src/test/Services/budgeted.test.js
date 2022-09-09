const { Service } = require('../../model')

async function budgeted (id, servicePrice) {
    if(!servicePrice) return console.log('Has empty fields!')
    const service = await Service.findByPk(id)
    if(!service) return console.log('No service found')
    if(service.serviceStatusId !== 1) return console.log('Bad Request')
    const serviceUpdated = {
        servicePrice: parseFloat(servicePrice),
        serviceStatusId: 2
    }
    await Service.update(serviceUpdated, { where: { id } })
    const serviceAfterUpdated = await Service.findByPk(id)
    return console.log(serviceAfterUpdated)
}
const serviceId = 2
const servicePrice= 150.85

budgeted(serviceId, servicePrice)