<template>
  <v-navigation-drawer
    app
    clipped
    right
    color="blue lighten-5"
    width="200"
    :value="drawer"
  >
    <v-list v-if="users">
      <v-layout column align-center>
        <v-list-item-title class="title blue--text">
          ON LINE
          <v-menu v-model="menu" offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }"
              ><v-btn dark icon color="light-blue darken-1" v-on="on"
                ><v-icon color="blue">mdi-face-profile</v-icon></v-btn
              ></template
            ><v-list nowrap class="flex-column"
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
                >Email :
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
          </v-menu></v-list-item-title
        >

        <v-list-item v-for="(item, i) in conUserList" :key="i">
          <v-list-item-content>
            <v-list-item-title
              ><v-avatar color="orange"
                ><v-img :src="url(item)"></v-img
              ></v-avatar>

              {{ users[item]['nickname'] }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-layout>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { debounce } from 'debounce'
import app from '@/feathers-client'

export default {
  name: 'UserDrawer',
  data() {
    return {
      menu: false
    }
  },
  computed: {
    ...mapGetters(['activeUser']),
    activeUser: {
      get() {
        return this.activeUser
      },
      set(field, value, service) {
        this.handleProfile(field, value, service)
      }
    },
    conUserList() {
      if (!this.OnLineUsers) {
        return []
      }
      return this.OnLineUsers
    },
    drawer() {
      return this.userDrawer
    },
    url(item) {
      return this.users[item]['avatar']
    }
  },
  async mounted() {
    await app.service('con_users').create({})
    await this.getBoards()
  },
  methods: {
    ...mapState(['users', 'OnLineUsers', 'userDrawer', 'activeUserId']),
    ...mapActions({ getBoards: 'fetch_user_list' }),
    handleProfile: debounce(function(field, value, service) {
      const data = {}
      data[field] = value
      app.service(service).patch(this.activeUser.id, data)
    }, 800)
  }
}
</script>

<style></style>
