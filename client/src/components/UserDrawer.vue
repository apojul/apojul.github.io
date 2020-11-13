<template>
  <v-navigation-drawer
    app
    clipped
    right
    color="blue lighten-5"
    width="200"
    :value="drawer"
  >
    <v-list v-if="$store.state.users">
      <v-layout column align-center>
        <v-list-item-title class="title blue--text"> ON LINE </v-list-item-title
        ><v-menu>
          <template v-slot:activator="{ on }"
            ><v-btn icon v-on="on"
              ><v-icon color="blue">mdi-dots-vertical</v-icon></v-btn
            ></template
          ><v-list class="flex-column"
            ><v-list-item
              v-for="(value, property) in activeUser"
              :key="property.id"
              class="align-baseline"
              >{{ property }} :
              <v-text-field solo dense :value="value"></v-text-field
              ><v-icon small>mdi-pencil</v-icon></v-list-item
            ></v-list
          >
        </v-menu>

        <v-list-item v-for="(item, i) in conUserList" :key="i">
          <v-list-item-content>
            <v-list-item-title
              ><v-avatar color="orange"
                ><v-img :src="url(item)"></v-img
              ></v-avatar>

              {{ $store.state.users[item]['nickname'] }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-layout>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import app from '@/feathers-client'

export default {
  name: 'UserDrawer',

  computed: {
    activeUser() {
      return this.$store.state.activeUser
    },
    conUserList() {
      if (this.$store.state.OnLineUsers === undefined) {
        return []
      }
      return this.$store.state.OnLineUsers
    },
    drawer() {
      return this.$store.state.userDrawer
    },
    url() {
      return item => {
        return this.$store.state.users[item]['avatar']
      }
    }
  },
  async mounted() {
    await app.service('con_users').create({})
    await this.$store.dispatch('fetch_user_list')
  }
}
</script>

<style></style>
