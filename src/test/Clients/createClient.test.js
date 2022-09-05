const { Client } = require('../../model')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')

async function createClient (name, lastName, cpf, birthday, postalCode, numberAddress, telephone, email, password) {
    const newClient = { 
        name,
        lastName,
        cpf,
        birthday, 
        postalCode,
        numberAddress,
        telephone,
        email,
        password: !password.trim() ? '' : bcrypt.hashSync(password, 10)
    }
    for (const props in newClient) {
        const propertyWithoutSpace = newClient[props].trim()
        if (!propertyWithoutSpace) return console.log('Has empty fields')
    }
    const verifyIfExists = await Client.findOne({ where: { [Op.or] : { email, cpf } } })
    if(verifyIfExists) return console.log('Exists in database')
    const clientAfterCreate = await Client.create(newClient)
    return console.log(clientAfterCreate)
}

const 
    name = 'Vagner',
    lastName = 'Siqueira',
    cpf = '47744477714',
    birthday = '15/05/1997', 
    postalCode = '08830050',
    numberAddress = '218',
    telephone = '11954558855',
    email = 'junior@mail.com',
    password = '123456'

const newClient = [
    name,
    lastName,
    cpf,
    birthday,
    postalCode,
    numberAddress,
    telephone,
    email,
    password
]

createClient(...newClient)   