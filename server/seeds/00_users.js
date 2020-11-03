const bcrypt = require('bcrypt')
const salt = 10
const passwd = '2345'
const crypto = require('crypto')
const pwd = bcrypt.hashSync(passwd, salt)

const gravatarUrl = 'https://s.gravatar.com/avatar'
const query = 's=60'
const getGravatar = () => {
  const hash = crypto.createHash('md5').update('ceci@est.unmail').digest('hex')
  return `${gravatarUrl}/${hash}?${query}`
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'p.allau@gmail.com',
          password: pwd,
          nickname: 'pascal',
          avatar: getGravatar(),
        },
        {
          email: 'p.allau@laposte.net',
          password: pwd,
          nickname: 'apojul',
          avatar: getGravatar(),
        },
        {
          email: 'andres@lilo.org',
          password: pwd,
          nickname: 'andres',
          avatar: getGravatar(),
        },
        {
          email: 'baba',
          password: pwd,
          nickname: 'baba',
          avatar: getGravatar(),
        },
        {
          email: 'bebe',
          password: pwd,
          nickname: 'bebe',
          avatar: getGravatar(),
        },
        {
          email: 'bibi',
          password: pwd,
          nickname: 'bibi',
          avatar: getGravatar(),
        },
        {
          email: 'bobo',
          password: pwd,
          nickname: 'bobo',
          avatar: getGravatar(),
        },
        {
          email: 'bubu',
          password: pwd,
          nickname: 'bubu',
          avatar: getGravatar(),
        },
      ])
    })
}
