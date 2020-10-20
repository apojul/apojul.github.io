/* eslint-disable no-console */

// tasks-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'tasks';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('title');
        table.string('description');
        table.integer('order');
        table.integer('column_id').references('id').inTable('columns').notNull().onDelete('CASCADE');
        table.integer('created_by').references('id').inTable('users').notNull().onDelete('CASCADE');
        table.timestamps(true, true);
        table.boolean('archived').defaultTo(false);
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};

