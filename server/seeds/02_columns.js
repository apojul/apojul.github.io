exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('columns')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('columns').insert([
        { name: 'To Do', rank: 1, board_id: 1 },
        { name: 'Doing', rank: 2, board_id: 1 },
        { name: 'Done', rank: 3, board_id: 1 },
        { name: 'A faire', rank: 4, board_id: 2 },
        { name: 'En cours', rank: 5, board_id: 2 },
        { name: 'Fait', rank: 6, board_id: 2 },
        { name: 'Backlog', rank: 7,board_id: 3 },
        { name: 'To Learn', rank: 8, board_id: 3 },
        { name: 'Learned', rank: 9, board_id: 3 },
      ])
    })
}
