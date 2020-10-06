<<<<<<< HEAD
//const config = require("@/config")

// Feathers configuration
import io from "socket.io-client"
const socket = io("http://localhost:3030", {
   transports: ["websocket"],
   force: true,
})

import feathers from "@feathersjs/client"

import store from "./store"
=======
// const config = require("@/config")

// Feathers configuration
import io from 'socket.io-client'

import feathers from '@feathersjs/client'
// import uploadDICOMFiles from "@/uploadDICOMFiles.js"

import store from './store'

const socket = io('http://localhost:3030')
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d

const app = feathers()

app.configure(feathers.socketio(socket))
<<<<<<< HEAD
app.configure(feathers.authentication({ 
   storage: window.localStorage 
}))
// hard coded authorisation

// const login = async () => {
//    try {
//      // First try to log in with an existing JWT
//      return await app.reAuthenticate();
//    } catch (error) {
//      // If that errors, log in with email/password
//      // Here we would normally show a login page
//      // to get the login information
//      return await app.authenticate({
//        strategy: 'local',
//        full_name:"andres",
//        email: 'andres@lilo.org',
//        password: '2345'
//      });
//    }
//  };
 
//  const main = async () => {
//    const auth = await login();
 
//    console.log('User is authenticated', auth);
 
   // Log us out again
 // await app.logout();
// };
 
// main();
 


// Created events for all services

app.service("boards").on("created", board => {  //"created" is the name of the channel this event is bradcasted on
   console.log("BOARDS EVENT created", board)
   store.commit("SET_BOARD", board)
})

app.service("lists").on("created", list => {
   console.log("LISTS EVENT created", list)
   store.commit("SET_LIST", list) // TODO create SET_LIST mutation
})

app.service("tasks").on("created", task => {
   console.log("TASK EVENT created", task)
   store.commit("SET_TASK", task)  // TODO create SET_TASK mutation
})

app.service("users").on("created", user => {
   console.log("USER EVENT created", user)
   store.commit("SET_USER", user) // TODO create SET_USER mutation
})


// TODO 


app.on("login", (authResult) => {
   const { user } = authResult
   console.log("Login!", user.id)
   store.commit("SET_SIGNIN_USER", user)
   // start background uploading process
   //uploadDICOMFiles(user)TODO : figure out a way to identify all the data (borads, lists and tasks) belonging to this user and upload it to state
})
app.on("logout", (authResult) => {
   const { user } = authResult
   console.log("Logout!", user.id)
   store.commit("CLEAR_SESSION")
})



// app.service("users").on("patched", user => {
//    console.log("USERS EVENT patched", user)
//    store.commit("SET_USER", user)
=======
app.configure(feathers.authentication({ storage: window.localStorage }))

app.on('login', (authResult /* , params, context */) => {
  const { user } = authResult
  console.log('Login!', user.id)
  store.commit('SET_SIGNIN_USER', user)
  //    // start background uploading process
  //    uploadDICOMFiles(user)
})

app.on('logout', (authResult /* params, context */) => {
  const { user } = authResult
  console.log('Logout!', user.id)
  store.commit('CLEAR_SESSION')
})

// app.service("users").on("patched", user => {
//    console.log("BOARDS EVENT patched", user)
//    store.commit("SET_BOARD", user)
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d
// })
// app.service("users").on("removed", user => {
//    console.log("USERS EVENT removed", user)
//    store.commit("DELETE_USER", user)
// })

<<<<<<< HEAD
export default app
=======
app.service('boards').on('created', board => {
  console.log('BOARDS EVENT created', board)
  store.commit('SET_BOARD', board)
  store.commit('ADD_NEW_BOARD', board)
})
export default app
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d
