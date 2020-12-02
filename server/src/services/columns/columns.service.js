// Initializes the `lists` service on path `/lists`
const { Columns } = require('./columns.class')
const createModel = require('../../models/columns.model')
const hooks = require('./columns.hooks')

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false
  }

  // Initialize our service with any options it requires
  app.use('/columns', new Columns (options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('columns')

  service.hooks(hooks)
}
