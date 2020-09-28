/* eslint-disable no-console */

// boards-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'boards';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        // are there any tables that need to be unique?
        table.increments('id');
        table.string('name');
        table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(db.fn.now());
        table.integer('created_by ').references('id').inTable('users').notNull().onDelete('CASCADE');
        table.specificType('members', 'INT[]').references('id').inTable('users').notNull().onDelete('CASCADE');
        table.string('background');
        // this string will be an url, is there a way to make sure a
        // valid URL is entered?
        table.boolean('is_private');
        // publique : tout le monde peut voir mais pas modifier
        table.string('description');
        // The content of these two arrays is a foreingkey (lists.id and users.id)
        // Should that be indicated now or later?
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};

