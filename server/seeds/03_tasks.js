exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { title: 'task A', rank: 0, column_id: 1, user_id: 1 },
        { title: 'task B', rank: 1, column_id: 1, user_id: 2 },
        { title: 'task C', rank: 0, column_id: 2, user_id: 3 },
        { title: 'task D', rank: 1, column_id: 2, user_id: 1 },
        { title: 'task E', rank: 0, column_id: 3, user_id: 2 },
        { title: 'task F', rank: 1, column_id: 3, user_id: 3 },
        { title: 'task G', rank: 0, column_id: 4, user_id: 1 },
        { title: 'task H', rank: 1, column_id: 4, user_id: 2 },
        { title: 'task I', rank: 0, column_id: 5, user_id: 3 },
        { title: 'task J', rank: 1, column_id: 5, user_id: 1 },
        { title: 'task K', rank: 0, column_id: 6, user_id: 2 },
        { title: 'task L', rank: 1, column_id: 6, user_id: 3 },
      ])
    })
}
