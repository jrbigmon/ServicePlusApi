const { Professional, sequelize } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')

const EvaluationController = {
    getHigherRatings: async (req, res) => {
        try {
            const { area: areaId } = req.query
            const professionals = await Professional.findAll({
                where: {
                    areaId 
                },
                limit: 10,
                include: [
                    {
                        association: 'evaluation',
                        attributes: ['assessment'],
                        orderBy: ['assessment', 'DESC']
                    },
                    [ sequelize.fn('SUM', sequelize.col('assessment')), 'evaluation' ]
                ]
            }) 
            return res.json(professionals)
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    }
}

module.exports = EvaluationController