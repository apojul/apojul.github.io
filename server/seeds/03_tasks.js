
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {title: 'task A', order: 1, list_id: 1, created_by: 1},
        {title: 'task B', order: 2, list_id: 1, created_by: 2},
        {title: 'task C', order: 1, list_id: 2, created_by: 3},
        {title: 'task D', order: 2, list_id: 2, created_by: 1},
        {title: 'task E', order: 1, list_id: 3, created_by: 2},
        {title: 'task F', order: 2, list_id: 3, created_by: 3}
      ]);
    });
};


