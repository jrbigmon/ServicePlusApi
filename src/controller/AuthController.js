const { Client, Professional, Admin } = require('../model')
const bcrypt = require('bcryptjs')
const DefaultErrors = require('../Errors/DefaultErrors')
const jwt = require('jsonwebtoken')

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      
      const typeUser = req.query.user
      
      let user
      
      if (typeUser == 'client') {
        user = await Client.findOne({ where: { email } })
        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json(DefaultErrors.UserNotValidated)
      }
      
      if (typeUser == 'professional') {
        user = await Professional.findOne({ where: { email } })
        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json(DefaultErrors.UserNotValidated)
      }
      
      if (typeUser == 'admin') {
        user = await Admin.findOne({ where: { email } })
        if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json(DefaultErrors.UserNotValidated)
      }
      
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: typeUser == 'admin' ? 'enemySpots' : ' ',
          typeUser
        },

        process.env.JWT_KEY,

        {
          expiresIn: '1h'
        }
      )
      
      return res.status(200).json({ message: 'Autentication successful', token })
    } catch (err) {
      return res.status(500).json(DefaultErrors.DatabaseOut)
    }
  }
}

module.exports = AuthController
