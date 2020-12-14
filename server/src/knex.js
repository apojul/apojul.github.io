const knex = require('knex')

module.exports = function (app) {
  const { client, connection } = app.get('postgres')

  const db = knex({ client, connection })
  //test system env variable $APP_DB
  console.log('connection db in knex.js', connection);
  // test sytem env variable APP_SERVER
  const {oauth} = app.get('authetication')
  console.log('oauth in kenx.js', oauth);

  app.set('knexClient', db)
}
