exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { title: 'task A', rank: 1, column_id: 1, user_id: 1 },
        { title: 'task B', rank: 2, column_id: 1, user_id: 2 },
        { title: 'task C', rank: 3, column_id: 2, user_id: 3 },
        { title: 'task D', rank: 4, column_id: 2, user_id: 1 },
        { title: 'task E', rank: 5, column_id: 3, user_id: 2 },
        { title: 'task F', rank: 6, column_id: 3, user_id: 3 },
        { title: 'task G', rank: 7, column_id: 4, user_id: 1 },
        { title: 'task H', rank: 8, column_id: 4, user_id: 2 },
        { title: 'task I', rank: 9, column_id: 5, user_id: 3 },
        { title: 'task J', rank: 10, column_id: 5, user_id: 1 },
        { title: 'task K', rank: 11, column_id: 6, user_id: 2 },
        { title: 'task L', rank: 12, column_id: 6, user_id: 3 },
      ])
    })
}
