const jwt = require('jsonwebtoken')
const DefaultErrors = require('../Errors/DefaultErrors')

const verifyIsAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_KEY)
    
    if(decode.isAdmin !== 'enemySpots') return res.status(401).json(DefaultErrors.UserNotValidated)
    
    req.user = decode

    return next()
  } catch (err) {
    return res.status(401).json(DefaultErrors.VerifyToken)
  }
}

module.exports = verifyIsAdmin
