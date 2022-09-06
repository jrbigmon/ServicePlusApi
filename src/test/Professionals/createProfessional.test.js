const { Professional } = require('../../model')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')

async function createProfessional (props) {
   const { name, lastName, cpf, birthday, postalCode, telephone, email, password, areaId } = props 
    const newProfessional = { 
        name, 
        lastName, 
        cpf: cpf.replace(/\./gi, '').replace(/\-/, ''), 
        birthday, 
        postalCode: postalCode.replace(/\-/, ''), 
        telephone: telephone.replace(/\(/, '').replace(/\)/, ''), 
        email: email ? email.toLowerCase() : '', 
        password: password.trim() ? bcrypt.hashSync(password, 10) : '', 
        areaId: parseInt(areaId)  
    }
    for (const props in newProfessional) {
        typeof newProfessional[props] == "number" ? propertyWithoutSpace = newProfessional[props] : propertyWithoutSpace = newProfessional[props].trim()
        if (!propertyWithoutSpace) return console.log('Has empty fields')
    }
    const verifyIfExists = await Professional.findOne({ where: { [Op.or]: { email, cpf } } })
    if(verifyIfExists) return console.log('Exists in database')
    await Professional.create(newProfessional)
    delete newProfessional.password
    return console.log(newProfessional)
}
const newUser = {
    name: 'vagner', 
    lastName: 'Siqueira', 
    cpf: '472.238.888-14', 
    birthday: '29/10/1997', 
    postalCode: '08830050', 
    telephone: '(11)956542085', 
    email: 'vagnerjr@mail.com', 
    password: '123456', 
    areaId: '1'
}

createProfessional(newUser)