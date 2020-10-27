exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { title: 'task A', order: 1, column_id: 1, created_by: 1 },
        { title: 'task B', order: 2, column_id: 1, created_by: 2 },
        { title: 'task C', order: 1, column_id: 2, created_by: 3 },
        { title: 'task D', order: 2, column_id: 2, created_by: 1 },
        { title: 'task E', order: 1, column_id: 3, created_by: 2 },
        { title: 'task F', order: 2, column_id: 3, created_by: 3 },
        { title: 'task G', order: 1, column_id: 4, created_by: 1 },
        { title: 'task H', order: 2, column_id: 4, created_by: 2 },
        { title: 'task I', order: 1, column_id: 5, created_by: 3 },
        { title: 'task J', order: 2, column_id: 5, created_by: 1 },
        { title: 'task K', order: 1, column_id: 6, created_by: 2 },
        { title: 'task L', order: 2, column_id: 6, created_by: 3 },
      ])
    })
}
