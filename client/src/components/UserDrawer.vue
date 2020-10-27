<template>
  <v-navigation-drawer
    app
    clipped
    right
    color="pink lighten-4"
    width="200"
    :value="drawer"
  >
    <v-list v-if="$store.state.users">
      <v-layout column align-center>
        <v-list-item-title class="title white--text" align-center>
          ON LINE
        </v-list-item-title>

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
