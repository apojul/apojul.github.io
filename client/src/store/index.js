import Vue from "vue";
import Vuex from "vuex";
import app from "@/feathers-client";
Vue.use(Vuex);

const state = {
  //ici juste les info que sont pour tout le monde
  // id d'utilisateur loggé
  boards: undefined,
  activeUser: undefined
  /* TODO otherUsers {
    get all users_id,
    onLine: true/false => subscribe to an event that tells who has logedin/logout
  }
  */
};

const getters = {
  // TODO one the user is loged in, the getters should determine which info is brought over from the db
};

const mutations = {
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
  SET_SIGNIN_USER: (state, user) => {
    state.activeUser = user;
  },
  CLEAR_SESSION: state => {
    // TODO to be called when user log out event is received
    state.activeUser = undefined;
  }
};
const actions = {
  async FETCH_BOARD_LIST({ commit }) {
    let boardList = await app.service("boards").find();
    commit("SET_BOARDS", boardList);
  },
  async CREATE_BOARD(_, payload) {
    //question JC pourquoi faut il mettre un premier argument?
    console.log("payload: ", payload);
    let newBoard = await app.service("boards").create({
      ...payload
    });
    console.log("newBoard =", newBoard);
  },
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
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {}
});

