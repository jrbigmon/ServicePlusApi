const { Admin } = require('../model')
const DefaultErrors = require('../Errors/DefaultErrors')
const bcrypt = require('bcryptjs')

const AdminController = {
    createAdmin: async (req, res) => {
        try {
            const { email, password } = req.body
            const newAdmin = { 
                email, 
                password: !password.trim() ? "" : bcrypt.hashSync(password, 10) 
            }
            for (let props in newAdmin){
                const propertyWithoutSpace = newAdmin[props].trim()
                if (!propertyWithoutSpace) return res.status(404).json(DefaultErrors.EmptyFields)
            }
            const verifyIfExists = await Admin.findOne({ where: { email }})
            if(verifyIfExists) return res.status(409).json(DefaultErrors.ExistsInDatase)
            await Admin.create({
                email: newAdmin.email,
                password: bcrypt.hashSync(newAdmin.password, 10)
            })
            return res.status(201).json({email, message: 'Success'})
        } catch (err) {
            return res.status(500).json(DefaultErrors.DatabaseOut)
        }
    }
}

module.exports = AdminController