const { Area } = require('../../model')

async function createArea(name){
    if(!name) return console.log('Has empty fields')
    const verifyIfExists = await Area.findOne({ where: { name } })
    if(verifyIfExists) return console.log('Exists in database')
    const newArea = await Area.create({ name })
    return console.log(newArea)
}
const name = 'Cleaning lady'
createArea(name)