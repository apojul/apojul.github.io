const { Service } = require('feathers-knex');

exports.Columns = class Columns extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'columns'
    });
  }
};
