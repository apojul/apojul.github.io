exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { title: 'task A', index: 1, column_id: 1, user_id: 1 },
        { title: 'task B', index: 2, column_id: 1, user_id: 2 },
        { title: 'task C', index: 1, column_id: 2, user_id: 3 },
        { title: 'task D', index: 2, column_id: 2, user_id: 1 },
        { title: 'task E', index: 1, column_id: 3, user_id: 2 },
        { title: 'task F', index: 2, column_id: 3, user_id: 3 },
        { title: 'task G', index: 1, column_id: 4, user_id: 1 },
        { title: 'task H', index: 2, column_id: 4, user_id: 2 },
        { title: 'task I', index: 1, column_id: 5, user_id: 3 },
        { title: 'task J', index: 2, column_id: 5, user_id: 1 },
        { title: 'task K', index: 1, column_id: 6, user_id: 2 },
        { title: 'task L', index: 2, column_id: 6, user_id: 3 },
      ])
    })
}
