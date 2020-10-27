exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('columns')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('columns').insert([
        { name: 'Doing', rank: 2, board_id: 1 },
        { name: 'To Do', rank: 1, board_id: 1 },
        { name: 'Done', rank: 3, board_id: 1 },
        { name: 'A faire', rank: 2, board_id: 2 },
        { name: 'En cours', rank: 1, board_id: 2 },
        { name: 'Fait', rank: 3, board_id: 2 },
        { name: 'Backlog', rank: 2, board_id: 3 },
        { name: 'To Learn', rank: 1, board_id: 3 },
        { name: 'Learned', rank: 3, board_id: 3 },
      ])
    })
}
