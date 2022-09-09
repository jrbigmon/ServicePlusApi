const { Service } = require('../../model')

async function finishService(id){
    const service = await Service.findByPk(id)
    if(!service) return console.log('Service not found')
    if(service.serviceStatusId !== 3) return console.log('Bad request')
    const serviceUpdated = {
        serviceStatusId: 4
    }
    await Service.update(serviceUpdated, { where: { id } })
    const serviceAfterUpdated = await Service.findByPk(id, {
        include: { association: 'serviceStatus', attributes: ['name'] }
    })
    return console.log(serviceAfterUpdated)
}
const id = 2
finishService(id)