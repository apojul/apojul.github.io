//const config = require("@/config")

// Feathers configuration
import io from 'socket.io-client'
const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  force: true
})

import feathers from '@feathersjs/client'

import store from './store'

const app = feathers()

app.configure(feathers.socketio(socket))
app.configure(
  feathers.authentication({
    storage: window.localStorage
  })
)
// CRUD FUNCTIONALITY/ ecouter l'arrivée des evenements pour declencher des mutations sur state

// Boards :
app.service('boards').on('created', board => {
  //"created" is the name of the channel this event is bradcasted on
  console.log('BOARDS EVENT created', board)
  store.commit('SET_NEW_BOARD', board)
})

app.service('boards').on('removed', board => {
  console.log('BOARDS EVENT removed', board)
  store.commit('REMOVE_BOARD', board)
})
app.service('boards').on('patched', board => {
  console.log('BOARDS EVENT modified', board)
  store.commit('SET_NEW_BOARD', board) // Mutation is the same for setting or patching: Vue.set(...)
})
// Columns :
app.service('columns').on('created', column => {
  console.log('COLUMNS EVENT created', column)
  store.commit('SET_NEW_COLUMN', column)
})
app.service('columns').on('removed', column => {
  console.log('COLUMNS EVENT removed', column)
  store.commit('REMOVE_COLUMN', column) // TODO mutation
})
app.service('columns').on('patched', column => {
  console.log('COLUMNS EVENT modified', column)
  store.commit('SET_NEW_COLUMN', column)
})
// Tasks :
app.service('tasks').on('created', task => {
  console.log('TASK EVENT created', task)
  store.commit('SET_NEW_TASK', task)
})
app.service('tasks').on('removed', task => {
  console.log('TASK EVENT removed', task)
  store.commit('REMOVE_TASK', task)
})
app.service('tasks').on('patched', task => {
  console.log('TASK EVENT patched', task)
  store.commit('SET_NEW_TASK', task)
})
// Users :
app.service('users').on('created', user => {
  console.log('USER EVENT created', user)
  store.commit('SET_NEW_USER', user)
})
/*une fois l'utilisateur a été soit efacé de la base soit modifié pour active = false,
on doit faire un logout
Si on utilise le flag 'active' 
app.service('users').on('patched', user => {
  console.log('USER EVENT patched', user)
  if (user.active) {
    store.commit('SET_NEW_USER', user)
  } else store.dispatch('logout')
})  */
app.service('users').on('deleted', user => {
  console.log('USER EVENT deleted', user)
  store.dispatch('logout')
})
app.service('users').on('patched', user => {
  console.log('USER EVENT patched', user)
  store.commit('PATCH_ACTIVE_USER', user)
})

app.on('login', authResult => {
  const { user } = authResult
  store.commit('SET_ACTIVE_USER', user)
  store.dispatch('fetch_board_list')
  store.dispatch('fetch_column_list')
  store.dispatch('fetch_task_list')
  store.dispatch('fetch_user_list')
})
app.on('logout', authResult => {
  const { user } = authResult
  console.log('Logout!', user.id)
  store.commit('CLEAR_SESSION')
  app.service('con_users').create({})
})

app.service('con_users').on('created', userList => {
  console.log('CON_USER_EVENT created', userList)
  store.commit('SET_ONLINE_USERS', userList)
})

export default app
