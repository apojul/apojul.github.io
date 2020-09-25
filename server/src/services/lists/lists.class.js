const { Service } = require('feathers-knex');

exports.Lists = class Lists extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'lists'
    });
  }
};
