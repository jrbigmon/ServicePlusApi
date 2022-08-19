const jwt = require('jsonwebtoken')
const DefaultErrors = require('../Errors/DefaultErrors')

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_KEY)

    req.user = decode

    sessionStorage.setItem('token', decode)

    return next()
  } catch (err) {
    return res.status(401).json(DefaultErrors.VerifyToken)
  }
}

module.exports = verifyToken