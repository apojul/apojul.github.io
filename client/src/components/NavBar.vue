<template>
      <v-app-bar 
      app 
      clipped-right
      clipped-left
      
      >
      <v-app-bar-nav-icon @click="boardDrawerState" />
      <v-toolbar-title class="mx-8">
        Kanban Board
      </v-toolbar-title>
      <v-btn
        small
        depressed
        dark
        color="light-blue darken-1"
        class="mx-2"
        :to="{ name: 'Home' }"
      >
        <span />
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-responsive max-width="260">
        <v-btn
          v-if="!activeUser"
          class="mx-1"
          depressed
          dark
          color="light-blue darken-1"
          :to="{ name: 'LogIn' }"
        >
          <span>Sign In</span>
          <v-icon right></v-icon> 
        </v-btn>
        <v-btn
          v-else
          class="mx-1"
          depressed
          dark
          color="light-blue darken-1"
          :to="{ name: 'LoggedOut' }"
          @click="handleSignOut()"
        >
          <span>Sign Out</span>
          <v-icon right >
            mdi-logout
          </v-icon>
        </v-btn>
        <v-btn
         color="pink lighten-4"
         dark
         class="mx-1"
          depressed
          @click="userDrawerState"
        >
          <v-icon >
            mdi-account-multiple
          </v-icon>
        </v-btn>
      </v-responsive>
        </v-app-bar>
</template>

<script>
export default {
name: 'NavBar',
data() {
    return { 
        //
        }
},
computed: {
    activeUser() {
      return this.$store.state.activeUser
    }
},
methods: {
    boardDrawerState() {
      this.$store.commit("SET_BOARD_DRAWER")
    },
    userDrawerState() {
      this.$store.commit('SET_USER_DRAWER')
    },
    handleSignOut() {
      this.$store.dispatch('log_out')
    }
  }
}
</script>

<style>

</style>