import Vue from "vue";
import Vuex from "vuex";
import app from "@/feathers-client"
Vue.use(Vuex);

const state = {
  boards: undefined
};

const getters = {
  countBoards: state => {
    return state.boards.length;
  }
};

const mutations = {
  SET_BOARDS: (state, boardList) => {
    state.boards = {}
      boardList.forEach(board => {
        state.boards[board.id]=board
    });
  },
  SET_BOARD: (state, board) => {    
        //state.boards[board.id]=board
        Vue.set(state.boards, board.id, board)
  },
  ADD_BOARD: (state, board) => {
       Vue.set(state.boards, board.id, board)
  }
};

const actions = {
  async FETCH_BOARD_LIST({ commit }) {

    let boardList = await app.service('boards').find() 
    commit("SET_BOARDS", boardList);
  },
  async CREATE_BOARD ({ commit }) {
    let newBoard = await app.service('boards').create({
      name: undefined,
      descritpion: undefined,
      background: undefined
    })
    console.log('newBoard =', newBoard)
    commit("ADD_BOARDS", newBoard)
    //TODO voir comment ça marche pour afficher la nouvelle liste dans store.state.boards
    // voir comment on peut voir quelle est la reponse de cette action. 
  }
}
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {}
});
