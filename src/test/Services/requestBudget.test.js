const { Service, Professional } = require('../../model')

async function requestBudget (clientId, professionalId, serviceDate, serviceDescription) {
    const newService = {
        clientId: parseInt(clientId),
        professionalId: parseInt(professionalId),
        serviceDate,
        serviceDescription 
    }
    for (let props in newService) {
        let propertyWithoutSpace
        typeof newService[props] == "number" ? propertyWithoutSpace = newService[props] : propertyWithoutSpace = newService[props].trim()
        if (!propertyWithoutSpace) return console.log('Has empty fields')
    }

    const verifyIfExists = await Professional.findByPk(parseInt(professionalId))

    if(!verifyIfExists) return console.log('Professional not exists to request budget')

    const serviceAfterCreate = await Service.create(newService)

    return console.log(serviceAfterCreate)
}
const clientId = 2
const professionalId = 3
const serviceDate = '2022-09-03'
const serviceDescription = 'Test create service'
const propsRequest = [clientId, professionalId, serviceDate, serviceDescription]
requestBudget(...propsRequest)