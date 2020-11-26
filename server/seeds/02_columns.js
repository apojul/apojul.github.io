exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('columns')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('columns').insert([
        { name: 'Doing',  board_id: 1 },
        { name: 'To Do', board_id: 1 },
        { name: 'Done', board_id: 1 },
        { name: 'A faire', board_id: 2 },
        { name: 'En cours', board_id: 2 },
        { name: 'Fait', board_id: 2 },
        { name: 'Backlog', board_id: 3 },
        { name: 'To Learn', board_id: 3 },
        { name: 'Learned', board_id: 3 },
      ])
    })
}
