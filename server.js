const dotenv = require('dotenv')
dotenv.config() // dotenv -e .env

const { isEmpty } = require('lodash')
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const env = require('./config/env')
const errorHandler = require('./config/errorHandler')
const httpStatus = require('./app/Helper/httpStatus')
const routes = require('./start/routes')

const Env = env()

app.use(cors())

// Parse -H 'content-type: application/json'
app.use(bodyParser.json())

// Parse -H 'content-type: application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true, }))

// Routes
app.get('/ping', (request, response) => response.status(httpStatus.CREATED).send({ message: 'pong', }))
app.use('/examples', routes.Example)

// Global error handler
app.use((error, request, response, next) => {
  if (response.headersSent) return next(errorHandler()(httpStatus.INTERNAL_SERVER_ERROR))

  const { message } = error

  return response.status(error.status ?? error.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR)
    .send({ error: isEmpty(error.error) ? errorHandler(message)(httpStatus.INTERNAL_SERVER_ERROR) : error, })
})

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const url = `${Env.get('DB_CONNECTION')}://${Env.get('MONGO_HOST')}:${Env.get('MONGO_PORT')}/${Env.get('MONGO_DB_NAME')}`

mongoose.connect(url, connectionOptions)
  .then(() => {
    console.log(`🚀 Connected to database at ${url}`)
  })
  .catch(({ message }) => {
    console.error(message)
    process.exit()
  })

app.listen(Number(Env.get('PORT')) ? Number(Env.get('PORT')) : 8081, () => {
  console.log(`🚀 Server listening at http(s)://localhost:${Env.get('PORT')}`)
})

