const { EvaluationHasProfessional, Professional, sequelize } = require('../model')
const { Op } = require('sequelize')
const DefaultErrors = require('../Errors/DefaultErrors')
const calcRatingProfessional = require('../util/calcRatingProfessional')

const EvaluationController = {
    getEvaluationByIdProfessinal: async (req, res) => {
        try {
            const { id: professionalId } = req.params

            const verifyIfExists = await Professional.findByPk(professionalId)
            
            if(!verifyIfExists) return res.status(404).json(DefaultErrors.NotExistsInDatase)
            
            const rating  = await EvaluationHasProfessional.findAll({
                raw: true,
                where: { professionalId },
                attributes: [
                    [sequelize.fn('sum', sequelize.col('assessment')), 'sumEvaluations'],
                    [sequelize.fn('count', sequelize.col('assessment')), 'countEvaluation']
                ]
            })
    
            const count = rating[0]['countEvaluation']
            const sum = rating[0]['sumEvaluations']

            const avarageEvaluation = calcRatingProfessional(sum, count)

            Object.assign(rating[0], { avarageEvaluation })

            return res.json(rating[0])
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    }
}

module.exports = EvaluationController