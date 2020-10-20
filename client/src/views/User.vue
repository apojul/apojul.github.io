<template>
  <v-app>
    <router-view />
    <v-app-bar app clipped-right>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="mx-8">
        Kanban Board
      </v-toolbar-title>
      <v-btn
        small
        depressed
        dark
        color="light-blue darken-1"
        class="mx-2"
        :to="{ name: 'LoggedOut' }"
      >
        <span />
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-responsive max-width="260">
        <v-btn
          v-if="!getAuthUser"
          class="mx-1"
          depressed
          dark
          color="light-blue darken-1"
          :to="{ name: 'LogIn' }"
        >
          <span>Sign In</span>
          <v-icon right>
            mdi-login
          </v-icon>
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
          v-show="!getAuthUser"
          class="mx-1"
          depressed
          dark
          color="light-blue darken-4"
          :to="{ name: 'SignUp' }"
        >
          <span>Sign up</span>
          <v-icon right>
            mdi-account-plus
          </v-icon>
        </v-btn>
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      max-width="250"
      :mini-variant.sync="mini"
      color="pink lighten-4"
    >
      <v-list nav class="overfow-y-auto" max-height="400">
        <v-list-item class="px-0">
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
          </v-list-item-avatar>

          <v-list-item-title>Pascal</v-list-item-title>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider />
        <v-list-group sub-group active-class="white--text text--accent-4">
          <template #activator>
            <v-list-item-title>Board List</v-list-item-title>
          </template>
          <v-list-item
            v-for="board in boardList"
            :key="board.id"
            dark
            :to="{ name: 'boardId', params: { id: board.id } }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ board.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          no-action
          sub-group
          active-class="grey--text text--accent-4"
        >
          <v-list-item-content>
            <v-list-item-title>Actions</v-list-item-title>
          </v-list-item-content>
          <v-list-item>
            <AddBoard />
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer app clipped right color="pink lighten-4" width="120">
      <v-list>
        <v-layout column align-center>
          <v-list-item-title class="title white--text" align-center>
            IN LINE
          </v-list-item-title>

          <v-list-item v-for="(item, i) in getConUserList" :key="i">
            <v-list-item-content>
              <v-list-item-title>
                {{ $store.state.users[item]['full_name'] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div>
        <v-container class="grey lighten-5 mb-6">
          <v-row no-gutters style="height: 150px;">
            <v-col v-for="(item, property, index) in boardList" :key="index">
              <v-card
                class="pa-2"
                outlined
                tile
                height="400"
                :to="{ name: 'boardId', params: { id: item.id } }"
              >
                {{ item['name'] }}
                <v-row no-gutters style="height: 150px;">
                  <v-col
                    v-for="(ite, propert, ind) in columnList"
                    :key="ind"
                    cols="4"
                    height="800"
                  >
                    <v-card class="mx-2" outlined tile height="300">
                      {{ ite['name'] }}
                      <v-col no-gutters style="height: 30px;">
                        <v-col v-for="n in 6" :key="n">
                          <v-card height="20"></v-card>
                        </v-col>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container v-if="show" fluid fill-height>
        <BoardView />
      </v-container>
    </v-main>
    <v-footer color="light-blue darken-3" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import BoardView from '@/views/BoardView'
// import ColumnView from '@/views/ColumnView'
// import TaskView from '@/views/TaskView'
import app from '@/feathers-client'
import AddBoard from '@/components/AddBoard'

export default {
  components: {
    BoardView,
    AddBoard,
    // TaskView,
    // ColumnView
  },
  data() {
    return {
      drawer: true,
      mini: false,
      group: true,
      links: ['About'],
      show: false
    }
  },
  computed: {
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    },
    columnList() {
      if (this.$store.state.columns === undefined) {
        this.$store.dispatch('fetch_column_list')
        return []
      }
      return this.$store.state.columns
    },
    getAuthUser() {
      return this.$store.state.authUser
    },
    userList() {
      if (this.$store.state.users === undefined) {
        this.$store.dispatch('fetch_user_list')
        return []
      }
      return this.$store.state.users
    },
    getConUserList() {
      if (this.$store.state.users === undefined) {
        this.userList
        return []
      }
      return this.$store.state.conUserList
    }
  },
  async mounted() {
    await app.service('con_users').create({})
  },
  methods: {
    handleSignIn() {
      this.$router.replace({
        name: 'LoggedOut'
      })
    },
    handleSignOut() {
      this.$store.dispatch('log_out')
      this.show = false
    },
    showDetail() {
      this.show = true
    }
  }
}
</script>

<style></style>
