const { Area } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const AreaController = {
  viewAreas: async (req, res) => {
    try {
      const areas = await Area.findAll()

      return res.json(areas)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  createArea: async (req, res) => {
    try {
      const { name } = req.body

      if(!name) return res.status(404).json(DefaultErrors.EmptyFields)

      const verifyIfExists = await Area.findOne({ where: { name } })

      if (verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)

      const area = await Area.create({ name })
      
      return res.status(201).json(area)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  updateArea: async (req, res) => {
    try {
      const { id } = req.params

      const { name } = req.body

      if(!name) return res.status(404).json(DefaultErrors.EmptyFields)

      const verifyIfExists = await Area.findByPk(id)
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      await Area.update({ name }, { where: { id } })

      const areaAfterUpdate = await Area.findByPk(id)
      
      return res.json(areaAfterUpdate)
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  },

  removeArea: async (req, res) => {
    try {
      const { id } = req.params
      
      const verifyIfExists = await Area.findByPk(id)
      
      if (!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
      
      await Area.destroy({ where: { id } })
      
      return res.status(204).json()
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = AreaController
