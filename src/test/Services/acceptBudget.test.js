const { Service } = require('../../model')

async function acceptBudget(id) {
    const service = await Service.findByPk(id)
    if(!service) return console.log('No service found')
    if(service.serviceStatusId !== 2) return console.log('Bad Request')
    const serviceUpdated = {
        serviceStatusId: 3
    }
    await Service.update(serviceUpdated, { where: { id } })
    const serviceAfterUpdated = await Service.findByPk(id)
    return console.log(serviceAfterUpdated)
}
const serviceId = 2
acceptBudget(serviceId)