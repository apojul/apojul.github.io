
exports.up = function(knex) {
  return knex.schema
    .createTable('tasks', table => {
      table.increments('id');
      table.string('text');
    })
    .createTable('users', table => {
      table.increments('id');
      table.string('email').unique();
      table.string('password');
      table.string('googleId');
      table.string('facebookId');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks').dropTable('users');
};
