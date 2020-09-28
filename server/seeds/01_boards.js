
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('boards').del()
    .then(function () {
      // Inserts seed entries
      return knex('boards').insert([
        {name: 'project 1', created_by: 1, is_private: true},
        {name: 'project 2', created_by: 2, is_private: false},
        {name: 'project 3', created_by: 3, is_private: true}
      ]);
    });
};

