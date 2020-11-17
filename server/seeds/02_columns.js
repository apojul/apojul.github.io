exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('columns')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('columns').insert([
        { name: 'Doing', index: 2, board_id: 1 },
        { name: 'To Do', index: 1, board_id: 1 },
        { name: 'Done', index: 3, board_id: 1 },
        { name: 'A faire', index: 2, board_id: 2 },
        { name: 'En cours', index: 1, board_id: 2 },
        { name: 'Fait', index: 3, board_id: 2 },
        { name: 'Backlog', index: 2, board_id: 3 },
        { name: 'To Learn', index: 1, board_id: 3 },
        { name: 'Learned', index: 3, board_id: 3 },
      ])
    })
}
