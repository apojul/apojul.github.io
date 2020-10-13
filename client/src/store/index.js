import Vue from "vue";
import Vuex from "vuex";
import app from "@/feathers-client";
Vue.use(Vuex);

const state = {
  // These objects are the content of the application
  boards: undefined,
  tasks: undefined,
  lists: undefined,
  activeBoard: undefined,
  activeList: undefined,
  activeTask: undefined,
  // These objects concern the user and users information
  activeUser: undefined, //current user
  otherUsers: [], //all the other users
  otherUsersOnLine: undefined // other users who are currently connected
};

const getters = {
  // TODO one the user is loged in, the getters should determine which info is brought over from the db
};

const mutations = {
  /* TODO LIST 
  CRUD: (fetch(.find), create(.create), delete(.delete) and modify(.patch))
  1 board delete and board modify
    - action DELETE_BOARD will make a socket call to db
    - socket will emmit an event
    - event listener in client will mutate state to reflect change in db 
  2 enable all CRUD actions with lists
    - Lists are fetched the moment a board/boards.id element is invoqued in the router
    - only the lists belonging to a current board must be called
    - when a list is created it must belong to a board
  3 enable all CRUD actions with tasks
    - Tasks are fetched the moment a board/boards.id element is invoqued in the router
    - only tasks belonging to an existing list must be fetched
    - fetched tasks belong in only one list 
  
    */
  
  // Boards manipulation
  SET_BOARDS: (state, boardList) => {
    state.boards = {};
    boardList.forEach(board => {
      state.boards[board.id] = board;
    });
  },
  SET_BOARD: (state, board) => {
    //state.boards[board.id]=board
    Vue.set(state.boards, board.id, board);
  },
  // Lists manipulation
  SET_LISTS: (state, listList) => {
    state.lists = {};
    listList.forEach(list => {
      state.lists[list.id] = list;
    });
  },
  // User manipulation
  SET_USER: (state, user) => {
    state.activeUser = user;
  },
  CLEAR_SESSION: state => {
    state.activeUser = undefined;
  },
  SET_CON_USER_LIST: (state, conUsers) => {
    state.otherUsersOnLine = conUsers.authenticatedUsers.map(user => user.id)
  },
  // TODO create a new user and login

};
const actions = {
  // Board related actions
  async FETCH_BOARD_LIST({ commit }) {
    let boardList = await app.service("boards").find();
    commit("SET_BOARDS", boardList);
  },
  async CREATE_BOARD(_, payload) {
    console.log("payload: ", payload);
    let newBoard = await app.service("boards").create({
      ...payload
    });
    console.log("newBoard =", newBoard);
  },
  // USER related actions
  async AUTHENTICATE_USER(_, payload) {
    try {
      return await app.reAuthenticate();
    } catch (error) {
      return await app.authenticate({
        strategy: "local",
        ...payload
      });
    }
  },
  async LOG_OUT() {
    await app.logout();
  }, 
  async REGISTER_USER(_, payload) {
    console.log("payload: ", payload);
    await app.service("users").create({
      ...payload
    });
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {}
});

