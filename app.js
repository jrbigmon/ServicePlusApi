const express = require( 'express')

const app = express()
const port = 3000
const uriBase = '/serviceplus/api/v1/'

const DefaultErrors = require('./src/Errors/DefaultErrors')
const AreaRouter = require('./src/router/AreaRouter')


app.use(uriBase, AreaRouter)

app.use('*', (req, res) => {
    return res.status(404).json(DefaultErrors.BadRequestByUser)
})

app.listen(port, () => console.log('listening on port ' + port))
