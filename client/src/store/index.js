<<<<<<< HEAD
import Vue from "vue";
import Vuex from "vuex";
import app from "@/feathers-client"
Vue.use(Vuex);

const state = { //ici juste les info que sont pour tout le monde
  // id d'utilisateur loggé
  boards: undefined,
  activeUser : undefined,
  /* TODO otherUsers {
    get all users_id,
    onLine: true/false => subscribe to an event that tells who has logedin/logout
  }
  */
};

const getters = {
  // TODO one the user is loged in, the getters should determine which info is brought over from the db
};
=======
import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/feathers-client'

Vue.use(Vuex)

const state = {
  users: undefined,
  newUser: undefined,
  token: null,
  authUser: undefined,
  boards: undefined,
  newBoard: undefined
}

const getters = {
  getNewBoard: state => state.newBoard
}
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d

const mutations = {
  SET_BOARDS: (state, boardList) => {
    state.boards = {}
<<<<<<< HEAD
      boardList.forEach(board => {
        state.boards[board.id]=board
    });
  },
  SET_BOARD: (state, board) => {    
        //state.boards[board.id]=board
        Vue.set(state.boards, board.id, board)
  },
  SET_SIGNIN_USER: (state, user) => { 
     state.activeUser = user
  },
  CLEAR_SESSION: (state) => { // TODO to be called when user log out event is received
    state.activeUser = undefined

  }
  
}
const actions = {
  async FETCH_BOARD_LIST({ commit }) {

    let boardList = await app.service('boards').find() 
    commit("SET_BOARDS", boardList);
  },
  async CREATE_BOARD (_, payload) {  //question JC pourquoi faut il mettre un premier argument?
    console.log("payload: ", payload)
    let newBoard = await app.service('boards').create({
      ...payload
    })
    console.log('newBoard =', newBoard)
  },
  async AUTHENTICATE_USER (payload) {

      try {
        return await app.reAuthenticate();
      } catch (error) {
        return await app.authenticate({
          strategy: 'local',
          ...payload
        });
      }
    },
    async LOG_OUT () {
      await app.logout()
    }
}

=======
    boardList.forEach(board => {
      state.boards[board.id] = board
    })
  },
  SET_BOARD: (state, board) => {
    Vue.set(state.boards, board.id, board)
  },
  ADD_NEW_BOARD: (state, board) => {
    state.newBoard = {}
    state.newBoard = board
    //Vue.set(state.newBoard, board.id, board)
  },
  SET_USERS: (state, userList) => {
    state.users = {}
    userList.forEach(user => {
      state.users[user.id] = user
    })
  },
  SET_USER: (state, user) => {
    Vue.set(state.user, user.id, user)
  },
  ADD_NEW_USER: (state, user) => {
    state.newUser = {}
    Vue.set(state.newUser, user.id, user)
  },
  SET_SIGNIN_USER: (state, authUser) => {
    state.authUser = {}
    //Vue.set(state.authUser, authUser.id, authUser)
    state.authUser = { ...authUser }
  },
  CLEAR_SESSION: state => {
    state.authUser = undefined
    //Vue.delete(state.authUser)
    // const index = state.authUser.indexOf(authUser)
    // state.authUser.splice(index, 1)
  }
}

const actions = {
  async fetchBoardList({ commit }) {
    const boardList = await app.service('boards').find()
    commit('SET_BOARDS', boardList)
  },
  async fetchUserList({ commit }) {
    const userList = await app.service('users').find()
    commit('SET_USER', userList)
  },
  async postBoard({ commit }, board) {
    console.log('payload', board)
    const addBoard = await app.service('boards').create(board)
    commit('ADD_NEW_BOARD', addBoard)
  },
  async postUser({ commit }, user) {
    const addUser = await app.service('users').create(user)
    commit('ADD_NEW_USER', addUser)
  },
  async login(/* { commit } */ _, credentials) {
    /* const authResult =  */ await app.authenticate({
      strategy: 'local',
      ...credentials
    })
    //commit('SET_SIGNIN_USER', authResult.user)
    //console.log('User is authenticated', authResult)
  },
  async logout() {
    await app.logout()
    //commit('CLEAR_SESSION')
    //console.log('User is no longer logged in', state.authUser)
  }
}
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {}
})
