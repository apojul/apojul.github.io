import Vue from "vue";
import Vuex from "vuex";
import app from "@/feathers-client";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // These objects are the content of the application
  boards: undefined,
  collumns: undefined,
  tasks: undefined,
  activeUser: undefined, //current user
  Users: undefined, //all the other users
  OnLineUsers: undefined, // other users who are currently online

  // pour chaque objet en state il y a une liste d'ids 
  boardsList: undefined, 
  collumnsLists: undefined, 
  tasksList: undefined,
  usersLists: undefined,
  

  },
  getters: {
    collumnsInBoard (){
      //TODO return => {board.id:[collumn.id ...], {board.id:[collumn.id...]...}
    },
    tascksInCollumns () {
      //TODO return => {collumn.id:[task.id ...], {collumn.id:[task.id...]...}
    },
    usersOnOffLine () {
      //TODO return => [{online: [user.id...]},{offline: [user.id...]}]
    }

  },
  mutations: {
    // Nom des funtions VERVE{SET UPDATE DELETE}_OBJECT
    // Populate State (lecture)
    SET_BOARDS: (state, boardList) => {
      state.boards = {};
      boardList.forEach(board => {
        state.boards[board.id] = board;
      });
    },
    SET_COLLUMNS: (state, collumnList) => {
      state.collumns = {};
      collumnList.forEach(collumn => {
        state.collumns[collumn.id] = collumn;
      });
    },
    SET_TASKS: (state, tasksList) => {
      state.tasks = {};
      tasksList.forEach(task => {
        state.tasks[task.id] = task;
      });
    },
    SET_OTHER_USERS: (state, user) => {
      state.otherUsers = {};
      user.forEach(user => {
        state.otherUsers[user.id] = user;  
      })
    },
    SET_ONLINE_USERS: (state, conUsers) => {
      state.OnLineUsers = conUsers.authenticatedUsers.map(user => user.id)
    },
    SET_ACTIVE_USER: (state, user) => {
      state.activeUser = user;
    },
    // Add new objects to state
    SET_NEW_BOARD: (state, board) => {
      //is equal to state.boards[board.id]=board
      Vue.set(state.boards, board.id, board);
    },
    SET_NEW_COLLUMN: (state, collumn) => {
      Vue.set(state.collumns, collumn.id, collumn);
    },
    SET_NEW_TASK: (state, task) => {
      Vue.set(state.tasks, task.id, task);
    },
    SET_NEW_USER: (state, user) => {
      Vue.set(state.users, user.id, user);
    },
    // Patch existing objects

    // Delete existing objects

    // Other
    
    CLEAR_SESSION: state => {
      state.activeUser = undefined;
    },
      
  },
  actions: {
    // Nom des variables : verve {fetch, create, delete, patch, etc} _object
    //                    or action {log_out}
    // Board related actions
    // TODO fetch collumn, fetch task, 
  async fetch_board_list({ commit }) {
    let boardList = await app.service("boards").find();
    commit("SET_BOARDS", boardList);
  },
  async create_board(_, payload) {
    console.log("payload: ", payload);
    let newBoard = await app.service("boards").create({
      ...payload
    });
    console.log("newBoard =", newBoard);
  },
  // USER related actions
  async log_in(_, payload) {
    try {
      return await app.reAuthenticate();
    } catch (error) {
      return await app.authenticate({
        strategy: "local",
        ...payload
      });
    }
  },
  async log_out() {
    await app.logout();
  }, 
  async sign_up(_, payload) {
    console.log("payload: ", payload);
    await app.service("users").create({
      ...payload
    });
  },
  async fetch_user_list ({commit}) {
    let usersList = await app.service("users").find();
    commit("SET_OTHER_USERS", usersList);
  }, 
 
  },
  modules: {}
});
