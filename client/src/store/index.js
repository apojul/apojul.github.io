import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/feathers-client'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // these objects are the content of the application/objets metier/seuls ceux ci sont des diccionaires
    // le reste sont des arrais d'ids.
    boards: undefined,
    columns: undefined,
    tasks: undefined,
    users: undefined, //all the other user      localStorage.clear()

    OnLineUsers: undefined, // other users who are currently online
    activeUser: undefined, //current user, TODO ici c'est just une id

    // Communication between components
    boardDrawer: false,
    userDrawer: true
    // loading: false

    // pour chaque objet en state il y a une liste d'ids
    // boardsList: undefined,
    // columnsList: undefined,
    // tasksList: undefined,
    // usersList: undefined, ces listes sont des computed dasn les composants pertinents
    // Dans le computed on ne peux pas metre d'arguments
    // taskslist, elle n'a pas d'argument mais à l'interieur il y a une fonction qu'elle a des arguments
    // à la place d'un valeur elle renvoie une fonction avec des arguments
    // on l'appelle avec les arguments en parentheses
  },
  getters: {
    //si c'est juste pour l'utiliser une fois, il vaut mieux de le mettre en computed prop
    activeUserInfo() {
      // va chercher le user.id de activeUser chez users
    },
    columnsInBoard() {
      //TODO return => {{board.id:[columns.id ...]}, {board.id:[columns.id...]...}
    },
    tascksIncolumns() {
      //TODO return => {columns.id:[task.id ...], {columns.id:[task.id...]...}
    },
    usersOnOffLine() {
      //TODO return => [{online: [user.id...]},{offline: [user.id...]}]
    }
  },
  mutations: {
    // Nom des funtions VERVE{SET UPDATE DELETE}_OBJECT
    // Populate State (lecture)
    SET_BOARDS: (state, boardList) => {
      state.boards = {}
      boardList.forEach(board => {
        state.boards[board.id] = board
      })
    },
    SET_COLUMNS: (state, columnsList) => {
      state.columns = {}
      columnsList.forEach(columns => {
        state.columns[columns.id] = columns
      })
    },
    SET_TASKS: (state, tasksList) => {
      state.tasks = {}
      tasksList.forEach(task => {
        state.tasks[task.id] = task
      })
    },
    SET_OTHER_USERS: (state, userList) => {
      state.users = {}
      userList.forEach(user => {
        state.users[user.id] = user
      })
    },
    SET_ONLINE_USERS: (state, conUsers) => {
      state.OnLineUsers = undefined
      state.OnLineUsers = conUsers.authenticatedUsers.map(user => user.id)
    },
    SET_ACTIVE_USER: (state, user) => {
      state.activeUser = user
      router.replace({
        name: 'user_id',
        params: { userName: user.nickname }
      })
    },
    // Add new objects or modify objects in state
    SET_NEW_BOARD: (state, board) => {
      //is equal to state.boards[board.id]=board
      Vue.set(state.boards, board.id, board)
    },
    SET_NEW_COLUMN: (state, columns) => {
      Vue.set(state.columns, columns.id, columns)
    },
    SET_NEW_TASK: (state, task) => {
      Vue.set(state.tasks, task.id, task)
    },
    SET_NEW_USER: (state, user) => {
      Vue.set(state.users, user.id, user)
    },
    // Delete existing objects
    REMOVE_BOARD: (state, board) => {
      Vue.delete(state.boards, board.id)
    },
    REMOVE_COLUMN: (state, column) => {
      Vue.delete(state.columns, column.id)
    },
    REMOVE_TASK: (state, task) => {
      Vue.delete(state.tasks, task.id)
    },
    // Other
    SET_BOARD_DRAWER: state => {
      state.boardDrawer = !state.boardDrawer
    },
    SET_USER_DRAWER: state => {
      state.userDrawer = !state.userDrawer
    },
    CLEAR_SESSION: state => {
      Object.keys(state).forEach(key => {
        state[key] = undefined
      })
    },
    SET_LOADING: state => {
      state.loading = !state.loading
    }
  },
  actions: {
    // andres- J'ai decidé de garder les actions pour crud
    // je pense que c'est plus de travail d'importer app pour chaque
    // component/view. Comme ça on n'a qu'a l'inmporter une fois dans le store

    // une action qui ne fait pas de commit deriere n'a pas forcement de sense, tant faire
    // app.service directement dans la methode.
    // Nom des variables : verve {fetch, create, delete, patch, etc} _object
    //                    or action {log_out}
    // Boards :
    // TODO Modify components that used dispatch actions that have been deleted
    async fetch_board_list({ commit }) {
      let boardList = await app.service('boards').find()
      commit('SET_BOARDS', boardList)
    },
    async create_board(_, payload) {
      let newBoard = await app.service('boards').create({
        ...payload
      })
      console.log('newBoard =', newBoard)
    },
    async post_board(_, board) {
      await app.service('boards').create(board)
    },
    async del_board(_, id) {
      await app.service('boards').remove(id)
    },
    async patch_board(_, board) {
      await app.service('boards').patch(board.id, board.data)
    },
    // Columns :
    async fetch_column_list({ commit }) {
      const columnList = await app.service('columns').find()
      commit('SET_COLUMNS', columnList)
    },
    async create_column(_, column) {
      let newColumn = await app.service('columns').create({
        ...column
      })
      console.log('newColumn =', newColumn)
    },
    async post_column(_, column) {
      await app.service('columns').create(column)
    },
    async del_column(_, id) {
      await app.service('columns').remove(id)
    },
    async patch_column(_, column) {
      await app.service('columns').patch(column.id, column.data)
    },
    // Tasks :
    async fetch_task_list({ commit }) {
      const taskList = await app.service('tasks').find()
      console.log("task list", taskList);
      commit('SET_TASKS', taskList)
    },
    async create_task(_, task) {
      let newTask = await app.service('tasks').create({
        ...task
      })
      console.log('newTask =', newTask)
    },
    async post_task(_, task) {
      await app.service('tasks').create(task)
    },
    async del_task(_, id) {
      await app.service('tasks').remove(id)
    },
    async patch_task(_, task) {
      await app.service('tasks').patch(task.id, task.data)
    },
    // USER :
    async log_in(_, payload) {
      try {
        if (!payload) {
          return await app.reAuthenticate()
        } else {
          return await app.authenticate({
            strategy: 'local',
            ...payload
          })
        }
      } catch (error) {
        router.push('LoggedOut')
      } // aficher un message
    },
    async log_out() {
      router.push('/')
      await app.logout()
    },
    async sign_up(_, payload) {
      await app.service('users').create({
        ...payload
      })
    },
    async fetch_user_list({ commit }) {
      let userList = await app.service('users').find()
      commit('SET_OTHER_USERS', userList)
    },
    async post_user(_, user) {
      await app.service('users').create(user)
    },
    /* Pour delete user il faut desider ce qu'on veut faire 
    quand on enleve un utilisateur de l'appli :
    - soit on fait delete
    - soit on a un champ active qui passe a false
    */
    async del_user(_, id) {
      await app.service('users').remove(id)
    },
    async patch_user(_, user) {
      await app.service('users').patch(user.id, user.data)
    }
  },
  modules: {}
})
