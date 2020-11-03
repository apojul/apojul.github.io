const { Service } = require('feathers-knex')
const crypto = require('crypto')
const gravatarUrl = 'https://s.gravatar.com/avatar'
const query = 's=60'
const getGravatar = (email) => {
  const hash = crypto
    .createHash('md5')
    .update(email.toLowerCase())
    .digest('hex')
  return `${gravatarUrl}/${hash}?${query}`
}

exports.Users = class Users extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'users',
    })
  }
  /* create(data, params) {
    // This is the information we want from the user signup data
    const { email, password, nickname, googleId, facebookId } = data
    // Use the existing avatar image or return the Gravatar for the email
    const avatar = data.avatar || getGravatar(email)
    // The complete user
    const userData = {
      email,
      nickname,
      password,
      googleId,
      facebookId,
      avatar,
    }

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params)
  } */
}
