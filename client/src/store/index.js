import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  boards: []
};

const getters = {
  countBoards: state => {
    return state.boards.length;
  }
};

const mutations = {
  SET_BOARDS: (state, boards) => (state.boards = boards)
};

const actions = {
  loadBoards({ commit }) {
    axios
      .get("http://127.0.0.1:3030/boards", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDE0NjMwMzcsImV4cCI6MTYwMTU0OTQzNywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiMSIsImp0aSI6Ijk0MTU0OGUzLWI3M2EtNGE1NS05ZWI0LTk3ODBmNjdmOTNkZSJ9.LfviN7udifdQtQTNYJNTfV6mkxDJVMt9IkpQRs8j5Cs"
        }
      })
      .then(result => {
        commit("SET_BOARDS", result.data.data);
      })
      .catch(error => {
        throw new Error(`API ${error}`);
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
