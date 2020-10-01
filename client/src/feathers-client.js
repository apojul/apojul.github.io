//const config = require("@/config")

// Feathers configuration
import io from "socket.io-client"
const socket = io("http://localhost:3030", {
   transports: ["websocket"],
   force: true,
})

import feathers from "@feathersjs/client"

import store from "./store"

const app = feathers()

app.configure(feathers.socketio(socket))
app.configure(feathers.authentication({ storage: window.localStorage }))
//TODO regler l'histoire d'authorisation



app.service("boards").on("created", board => {
   console.log("BOARDS EVENT created", board)
   store.commit("SET_BOARD", board)
})


// app.on("login", (authResult, params, context) => {
//    const { user } = authResult
//    console.log("Login!", user.id)
//    store.commit("SET_SIGNIN_USER", user)
//    // start background uploading process
//    uploadDICOMFiles(user)
// })

// app.on("logout", (authResult, params, context) => {
//    const { user } = authResult
//    console.log("Logout!", user.id)
//    store.commit("CLEAR_SESSION")
// })



// app.service("users").on("patched", user => {
//    console.log("USERS EVENT patched", user)
//    store.commit("SET_USER", user)
// })
// app.service("users").on("removed", user => {
//    console.log("USERS EVENT removed", user)
//    store.commit("DELETE_USER", user)
// })

export default app