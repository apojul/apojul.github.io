const { Service } = require('feathers-knex')

exports.Boards = class Boards extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'boards'
    })
  }
}
