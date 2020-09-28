
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        {name: 'Doing', rank: 2, created_on: 1},
        {name: 'To Do', rank: 1, created_on: 1},
        {name: 'Done', rank: 3, created_on: 1}
      ]);
    });
};


