const express = require('express')

const app = express()
const port = 3000
const uriBase = '/serviceplus/api/v1/'

const DefaultErrors = require('./src/Errors/DefaultErrors')
const AreaRouter = require('./src/router/AreaRouter')
const ClientRouter = require('./src/router/ClientRouter')
const ProfessionalRouter = require('./src/router/ProfessionalRouter')
const ServiceStatus = require('./src/router/ServiceStatusRouter')
const AuthRouter = require('./src/router/AuthRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(uriBase, AreaRouter)
app.use(uriBase, ClientRouter)
app.use(uriBase, ProfessionalRouter)
app.use(uriBase, ServiceStatus)
app.use(uriBase, AuthRouter)

app.use((req, res, next) => {
  res.status(404).json(DefaultErrors.BadRequestByUser)
  next()
})

app.listen(port, () => console.log('listening on port ' + port))
