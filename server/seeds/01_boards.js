exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('boards')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('boards').insert([
        { name: 'project 1', user_id: 1, is_private: true },
        { name: 'project 2', user_id: 2, is_private: false },
        { name: 'project 3', user_id: 3, is_private: true },
      ])
    })
}
