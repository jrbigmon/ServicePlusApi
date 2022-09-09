const { Area } = require('../../model')

async function viewAreas() {
    const areas = await Area.findAll({
        attributes: ['id', 'name']
    })
    return console.log(areas)
}
viewAreas()