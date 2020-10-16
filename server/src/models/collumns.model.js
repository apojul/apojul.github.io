/* eslint-disable no-console */

// lists-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'collumns';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.integer('rank');
        table.integer('created_on').references('id').inTable('boards').notNull().onDelete('CASCADE');
        table.timestamps(true, true);
        table.boolean('archived').defaultTo(false);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
