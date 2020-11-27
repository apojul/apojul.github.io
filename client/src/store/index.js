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
    activeUserId: undefined, //current user, TODO ici c'est just une id

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
    activeUser: state => {
      if (state.users === undefined) {
        return {}
      }
      return state.users[state.activeUserId]
    },
    //si c'est juste pour l'utiliser une fois, il vaut mieux de le mettre en computed prop
    activeUserInfo() {
      // va chercher le user.id de activeUser chez users
    },
    columnsInBoardArray(state) {
      // les deux fonctions font la même chose mais avec une syntaxe differente
      return id => {
        let Column = Object.values(state.columns).filter(
          column => column.board_id === id
        )
        console.log('getters columnsInBoardArray', Column)
        return Column
      }
    },
    tasksIncolumnsArray: state => id => {
      let Tasks = Object.values(state.tasks).filter(
        task => task.column_id === id
      )
      return Tasks
    },
    usersOnOffLine() {
      //TODO return => [{online: [user.id...]},{offline: [user.id...]}]
    }
  },
  mutations: {
    UPDATE_DISPLAY_COLUMNS: (
      state,
      getters,
      { boardId, fromColumnIndex, toColumnIndex }
    ) => {
      const columnList = getters['columnsInBoardArray'](boardId)
      console.log('columnList', columnList)
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      console.log('columnToMove', columnToMove)
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    PATCH_DISPLAY_COLUMNS: state => {
      return state.columns
    },

    // Nom des funtions VERVE{SET UPDATE DELETE}_OBJECT
    // Populate State (lecture)
    SET_BOARDS: (state, boardList) => {
      state.boards = {}
      boardList.forEach(board => {
        Vue.set(state.boards, board.id, board)
      })
    },
    SET_COLUMNS: (state, columnsList) => {
      state.columns = {}
      columnsList.forEach(columns => {
        Vue.set(state.columns, columns.id, columns)
      })
    },
    SET_TASKS: (state, tasksList) => {
      state.tasks = {}
      tasksList.forEach(task => {
        Vue.set(state.tasks, task.id, task)
      })
    },
    SET_OTHER_USERS: (state, userList) => {
      state.users = {}
      userList.forEach(user => {
        Vue.set(state.users, user.id, user)
      })
    },
    SET_ONLINE_USERS: (state, conUsers) => {
      Vue.set(
        state,
        'OnLineUsers',
        conUsers.authenticatedUsers.map(user => user.id)
      )
    },
    SET_ACTIVE_USER: (state, user) => {
      Vue.set(state, 'activeUserId', user.id)
    },
    // Add new objects or modify objects in state
    SET_NEW_BOARD: (state, board) => {
      //is equal to state.boards[board.id]=board
      Vue.set(state.boards, board.id, board)
    },
    SET_NEW_COLUMN: (state, column) => {
      Vue.set(state.columns, column.id, column)
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
      Vue.set(state, 'boardDrawer', !state.boardDrawer)
    },
    SET_USER_DRAWER: state => {
      Vue.set(state, 'userDrawer', !state.userDrawer)
    },
    CLEAR_SESSION: state => {
      Object.keys(state).forEach(key => {
        Vue.set(state, key, undefined)
      })
    },
    SET_LOADING: state => {
      Vue.set(state, 'loading', state.loading)
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
    async fetch_board_list({ commit }) {
      const boardList = await app.service('boards').find()
      commit('SET_BOARDS', boardList)
    },
    // Columns :
    async fetch_column_list({ commit }) {
      const columnList = await app.service('columns').find()
      commit('SET_COLUMNS', columnList)
    },
    // Tasks :
    async fetch_task_list({ commit }) {
      const taskList = await app.service('tasks').find()
      commit('SET_TASKS', taskList)
    },
    // USER :
    async log_in(_, payload) {
      try {
        if (!payload) {
          return await app.reAuthenticate()
        } else {
          console.log(payload)
          return await app.authenticate({
            strategy: 'local',
            ...payload
          })
        }
      } catch (error) {
        console.log(error)
        router.push('LoggedOut')
      } // aficher un message
    },
    async log_out() {
      router.replace('/')
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
    }
    /* Pour delete user il faut desider ce qu'on veut faire 
    quand on enleve un utilisateur de l'appli :
    - soit on fait delete
    - soit on a un champ active qui passe a false
    */
  },
  modules: {}
})
