const Env = require('../../config/env') // Imports environment variables.
const Example = require('../Repository/Model/Example')

module.exports = class ExampleService {
  getEnvVar(envVar) {
    console.info(Env.get(envVar.toUpperCase()))
  }

  create(examples) {
    return Example.create(examples)
  }

  find(query) {
    return Example.find(query)
  }

  findById(id) {
    return Example.findById(id)
  }

  findByIdAndDelete(id) {
    return Example.findByIdAndDelete(id)
  }

  findByIdAndUpdate(example) {
    const { id, ...rest } = example

    return Example.findByIdAndUpdate(id, rest)
  }
}
