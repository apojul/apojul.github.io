module.exports = function (app) {
  class ConUsersService {
    create() {
      let authenticatedChannel = app.channel('authenticated')
      let authenticatedUsers = authenticatedChannel.connections.map(
        (connection) => connection.user
      )
      let value_created = {authenticatedUsers}
      console.log('service con user');
      return Promise.resolve(value_created)
    }

  }
  app.use('con_users', new ConUsersService(app))
}
