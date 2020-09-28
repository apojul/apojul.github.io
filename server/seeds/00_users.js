
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'pascalallau@gmail.com', password:'2345', full_name: 'pascal'},
        {email: 'pascal.allau@laposte.net', password:'2345', full_name: 'apojul'},
        {email: 'andres@lilo.org', password:'2345', full_name: 'andres'}
      ]);
    });
};
