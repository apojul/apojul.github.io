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
  mutations: {},
  actions: {},
  modules: {}
});
