//const config = require("@/config")

// Feathers configuration
import io from "socket.io-client";
const socket = io("http://localhost:3030", {
  transports: ["websocket"],
  force: true
});

import feathers from "@feathersjs/client";

import store from "./store";

const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);

app.service("boards").on("created", board => {
  //"created" is the name of the channel this event is bradcasted on
  console.log("BOARDS EVENT created", board);
  store.commit("SET_NEW_BOARD", board);
});

app.service("columns").on("created", column => {
  console.log("COLUMNS EVENT created", column);
  store.commit("SET_NEW_COLUMN", column); 
});

app.service("tasks").on("created", task => {
  console.log("TASK EVENT created", task);
  store.commit("SET_NEW_TASK", task); 
});

app.service("users").on("created", user => {
  console.log("USER EVENT created", user);
  store.commit("SET_NEW_USER", user);
});

// TODO

app.on("login", authResult => {
  const { user } = authResult;
  console.log("Login!", user.id);
  store.commit("SET_ACTIVE_USER", user);
  // start background uploading process
  //uploadDICOMFiles(user)TODO : figure out a way to identify all the data (borads, columns and tasks) belonging to this user and upload it to state
});
app.on("logout", authResult => {
  const { user } = authResult;
  console.log("Logout!", user.id);
  store.commit("CLEAR_SESSION");
});

// app.service("users").on("patched", user => {
//    
//    store.commit("SET_USER", user)
// })
// app.service("users").on("removed", user => {
//    console.log("USERS EVENT removed", user)
//    store.commit("DELETE_USER", user)
// })

app.service('con_users').on('created', userList => {
  console.log('CON_USER_EVENT created', userList)
  store.commit('SET_ONLINE_USERS', userList)
})



export default app;
