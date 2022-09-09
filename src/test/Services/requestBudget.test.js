const { Service, Professional } = require('../../model')

async function requestBudget (props) {
    const {clientId, professionalId, serviceDate, serviceDescription } = props
    const newService = {
        clientId: parseInt(clientId),
        professionalId: parseInt(professionalId),
        serviceDate,
        serviceDescription 
    }
    for (let props in newService) {
        typeof newService[props] == "number" ? propertyWithoutSpace = newService[props] : propertyWithoutSpace = newService[props].trim()
        if (!propertyWithoutSpace) return console.log('Has empty fields')
    }

    const verifyIfExists = await Professional.findByPk(parseInt(professionalId))

    if(!verifyIfExists) return console.log('Professional not exists to request budget')

    const serviceAfterCreate = await Service.create(newService)

    return console.log(serviceAfterCreate)
}
const newService = {
    clientId: 4,
    professionalId: 1,
    serviceDate: new Date().toDateString(),
    serviceDescription: 'Test budget service'
}
console.log(newService)
requestBudget(newService)