const { Service } = require('feathers-knex');

exports.Collumns = class Lists extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'collumns'
    });
  }
};
