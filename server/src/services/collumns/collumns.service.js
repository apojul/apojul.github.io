// Initializes the `lists` service on path `/lists`
const { Collumns } = require('./collumns.class');
const createModel = require('../../models/collumns.model');
const hooks = require('./collumns.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: false
  };

  // Initialize our service with any options it requires
  app.use('/collumns', new Collumns(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collumns');

  service.hooks(hooks);
};
