const { Area } = require('../../model')

async function updateArea(id, name){
    if(!name) return console.log('Has empty fields')
    const verifyIfExists = await Area.findByPk(id)
    if(!verifyIfExists) return console.log('Not Exists in database')
    const alreadyRegistered = await Area.findOne({ where: { name } })
    if(alreadyRegistered) return console.log('Already Registered in database')
    await Area.update({ name }, { where: { id } })
    const areaAfterUpdate = await Area.findByPk(id)
    return console.log(areaAfterUpdate)
}
const id = 5
const name = 'Window cleaner'
updateArea(id, name)