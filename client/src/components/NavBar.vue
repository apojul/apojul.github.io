<template>
      <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click="LeftDrawer = !LeftDrawer" />
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
          depressed
        >
          <span>Sign up</span>
          <v-icon right>
            mdi-account-plus
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
        LeftDrawer: true
        }
},
computed: {
    activeUser() {
      return this.$store.state.activeUser
    }
},
methods: {
    handleSignOut() {
      this.$store.dispatch('log_out')
      console.log('btn sign out')
    }
  }
}
</script>

<style>

</style>