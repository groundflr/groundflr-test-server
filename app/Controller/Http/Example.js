const { isEmpty } = require('lodash')
const Router = require('express').Router
const ExampleService = require('../../Service/Example')
const httpStatus = require('../../Helper/httpStatus')

class ExampleController {
  #exampleService

  constructor() {
    this.#exampleService = new ExampleService()
  }

  create(request, response, next) {
    const { body } = request

    return this.#exampleService.create(body)
      .then((examples) => response.status(httpStatus.CREATED).send(examples))
      .catch(({ message }) => next(new Error(message)))
  }

  find(request, response, next) {
    const { query } = request

    return this.#exampleService.find(query)
      .then((examples) => isEmpty(examples)
        ? response.status(httpStatus.NOT_FOUND).send([])
        : response.status(httpStatus.OK).send(examples))
      .catch(({ message }) => next(new Error(message)))
  }

  findById(request, response, next) {
    const { params } = request
    const { id } = params

    return this.#exampleService.findById(id)
      .then((example) => isEmpty(example)
        ? response.status(httpStatus.NOT_FOUND).send({})
        : response.status(httpStatus.OK).send(example))
      .catch(({ message }) => next(new Error(message)))
  }

  findByIdAndDelete(request, response, next) {
    const { params } = request
    const { id } = params

    return this.#exampleService.findByIdAndDelete(id)
      .then((example) => isEmpty(example)
        ? response.status(httpStatus.NOT_FOUND).send({})
        : response.status(httpStatus.OK).send(example))
      .catch(({ message }) => next(new Error(message)))
  }

  findByIdAndUpdate(request, response, next) {
    const { body, params } = request
    const { id } = params

    return this.#exampleService.findByIdAndUpdate({ ...body, id })
      .then((example) => isEmpty(example)
        ? response.status(httpStatus.NOT_FOUND).send({})
        : response.status(httpStatus.OK).send(example))
      .catch(({ message }) => next(new Error(message)))
  }

  routes() {
    const router = Router()

    router
      .route('/')
      .get(this.find.bind(this))
      .post(this.create.bind(this))

    router
      .route('/:id')
      .delete(this.findByIdAndDelete.bind(this))
      .get(this.findById.bind(this))
      .put(this.findByIdAndUpdate.bind(this))

    return router
  }
}

module.exports = new ExampleController().routes()
