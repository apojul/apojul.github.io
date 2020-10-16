import Vue from "vue";
import Vuex from "vuex";
//import app from "@/feathers-client";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // These objects are the content of the application
  boards: undefined,
  tasks: undefined,
  lists: undefined,

  activeBoard: undefined,
  activeList: undefined,
  activeTask: undefined,
  // Dictionaires de liason à utiliser avec un getter 
  boardsList: undefined, // cest juste une liste d'id.
  listList: undefined,

  // These objects concern the user and users information
  activeUser: undefined, //current user
  Users: undefined, //all the other users
  OnLineUsers: undefined // other users who are currently online

  },
  mutations: {
    SET_BOARDS: (state, boardList) => {
      state.boards = {};
      boardList.forEach(board => {
        state.boards[board.id] = board;
      });
    },
    SET_BOARD: (state, board) => {
      //is equal to state.boards[board.id]=board
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
      state.OnLineUsers = conUsers.authenticatedUsers.map(user => user.id)
    },
    // SET_OTHER_USERS: (state, user) => {
    //   state.otherUsers = {};
    //   user.forEach(user => {
    //     state.otherUsers[user.id] = user;  
    //   }).filter(user => user.id !== "9") //s'enlever soi meme
    // console.log("filtered users ", state.otherUsers) 
    // }
  },
  actions: {
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
  },
  async FETCH_OTHER_USERS ({commit}) {
    let othetUsersList = await app.service("users").find();
    commit("SET_OTHER_USERS", othetUsersList);
  }, 
 
  },
  modules: {}
});
