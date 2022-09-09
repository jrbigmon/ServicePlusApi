const { Service } = require('../../model')

async function cancelService(id, serviceDescription){
    const service = await Service.findByPk(id)
    if(!serviceDescription)return console.log('Has empty fields')
    if(!service) return console.log('Service not found')
    if(service.serviceStatusId == 4 || service.serviceStatusId == 5) return console.log('Bad Request')
    const serviceUpdated = {
        serviceDescription,
        serviceStatusId: 5
    }
    await Service.update(serviceUpdated, { where: { id } })
    const serviceAfterUpdated = await Service.findByPk(id)
    return console.log(serviceAfterUpdated)
}
const id = 3
const serviceDescription = 'Test canceled'
cancelService(id, serviceDescription)