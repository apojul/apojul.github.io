/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient')
  const tableName = 'users'

  db.schema.hasTable(tableName).then((exists) => {
    if (!exists) {
      db.schema
        .createTable(tableName, (table) => {
          table.increments('id')
          table.string('nickname')
          table.string('email').unique().notNullable()
          table.string('password').notNullable()
          table.string('google_id')
          table.string('facebook_id')
          table.timestamps(true, true)
          table.string('avatar')
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch((e) => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
