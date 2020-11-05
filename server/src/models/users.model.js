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
          table.string('email').unique()
          table.string('password')
          table.string('facebookId').unique()
          table.string('githubId').unique()
          table.string('googleId').unique()
          table.timestamps(true, true)
          table.string('avatar')
        })
        .then(() => console.log(`Created ${tableName} table`))
        .catch((e) => console.error(`Error creating ${tableName} table`, e))
    }
  })

  return db
}
