
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'andres_pascal',
      user:     'andres_pascal',
      password: '2345'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
<<<<<<< HEAD
    client: 'pg',
    connection: 'postgres://andres_pascal:2345@db:5432/andres_pascal',
=======
    client: 'postgresql',
    connection: {
      database: 'kanban',
      user:     'kanban',
      password: '2345'
    },
>>>>>>> 36ee7118aa46d4d8af2d79baccbfa7a51f2d4646
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
