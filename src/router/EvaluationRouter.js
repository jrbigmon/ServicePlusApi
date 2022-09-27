const express = require('express')
const router = express.Router()
const EvaluationController = require('../controller/EvaluationController')

router.get('/professionals/:id/rating', EvaluationController.getEvaluationByIdProfessinal)

module.exports = router