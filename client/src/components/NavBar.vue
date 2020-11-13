<template>
  <v-app-bar app clipped-right clipped-left color="light-blue darken-2">
    <v-app-bar-nav-icon dark @click="boardDrawerState" />
    <v-toolbar-title class="mx-6 white--text">Kanban Board</v-toolbar-title>
    <v-btn
      small
      depressed
      dark
      color="light-blue darken-1"
      class="mx-2"
      :to="{ name: 'user_id' }"
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
        @click="handleSignOut"
      >
        <span>Sign Out</span>
        <v-icon right>
          mdi-logout
        </v-icon>
      </v-btn>
      <v-btn
        color="light-blue darken-1"
        dark
        class="mx-1"
        depressed
        @click="userDrawerState"
      >
        <v-icon>
          mdi-account-multiple-outline
        </v-icon> </v-btn
      ><v-menu :close-on-content-click="false">
        <template v-slot:activator="{ on }"
          ><v-btn icon v-on="on"
            ><v-icon color="white">mdi-dots-vertical</v-icon></v-btn
          ></template
        ><v-list no-wrapclass="flex-column"
          ><v-list-item class="align-baseline"
            >Name :
            <v-text-field
              flat
              solo
              dense
              :value="activeUser['nickname']"
              @input="handleProfile('nickname', $event, 'users')"
            ></v-text-field></v-list-item
          ><v-list-item class="align-baseline"
            >email :
            <v-text-field
              flat
              solo
              dense
              :value="activeUser['email']"
              @input="handleProfile('email', $event, 'users')"
            ></v-text-field
          ></v-list-item>
          <v-list-item class="align-baseline"
            >Avatar :
            <v-textarea
              flat
              solo
              dense
              :value="activeUser['avatar']"
              @input="handleProfile('avatar', $event, 'users')"
            ></v-textarea></v-list-item
        ></v-list>
      </v-menu>
    </v-responsive>
  </v-app-bar>
</template>

<script>
import app from '@/feathers-client'

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
    handleProfile(field, value, service) {
      const data = {}
      data[field] = value
      app.service(service).patch(this.activeUser.id, data)
    },
    boardDrawerState() {
      this.$store.commit('SET_BOARD_DRAWER')
    },
    userDrawerState() {
      this.$store.commit('SET_USER_DRAWER')
    },
    handleSignOut() {
      this.$store.dispatch('log_out')
      //     this.$router.push('/LoggedOut')
    }
  }
}
</script>

<style></style>
