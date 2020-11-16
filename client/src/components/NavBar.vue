<template>
  <v-app-bar app clipped-right clipped-left height="60px" color="transparent">
    <v-app-bar-nav-icon @click="boardDrawerState" />
    <v-toolbar-title class="mx-6">Kanban Board</v-toolbar-title>
    <v-btn
      small
      depressed
      dark
      color="light-blue darken-1"
      class="mx-2"
      :to="{ name: 'user_id' }"
    >
      <span />
      <v-icon>mdi-home-outline</v-icon> </v-btn
    ><v-spacer></v-spacer>
    <v-btn
      v-if="!activeUserId"
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
    ><v-menu v-model="menu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }"
        ><v-btn dark depressed color="light-blue darken-1" v-on="on"
          ><v-icon>mdi-face-profile</v-icon></v-btn
        ></template
      ><v-list no-wrap class="flex-column"
        ><v-subheader class="justify-center blue--text"
          >Edit your profile</v-subheader
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
        ><v-list-item
          ><v-btn icon @click="menu = false"
            ><v-icon>mdi-close</v-icon>Close</v-btn
          ></v-list-item
        ></v-list
      >
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import app from '@/feathers-client'

export default {
  name: 'NavBar',
  data() {
    return {
      menu: false
    }
  },
  computed: {
    ...mapGetters(['activeUser']),
    ...mapState(['activeUserId'])
  },
  methods: {
    handleProfile(field, value, service) {
      const data = {}
      data[field] = value
      app.service(service).patch(this.activeUserId, data)
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
