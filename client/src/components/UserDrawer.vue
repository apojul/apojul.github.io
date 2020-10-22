<template>
      <v-navigation-drawer app clipped right color="pink lighten-4" width="120">
      <v-list>
        <v-layout column align-center>
          <v-list-item-title class="title white--text" align-center>
            ON LINE
          </v-list-item-title>

          <v-list-item v-for="(item, i) in conUserList" :key="i">
            <v-list-item-content>
              <v-list-item-title>
                {{ $store.state.users[item]['full_name'] }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'UserDrawer',
    computed: {
    conUserList() {
      if (this.$store.state.users === undefined) {
        this.OnLineUsers
        return []
      }
      return this.$store.state.OnLineUsers
    },
    userList() {
      if (this.$store.state.users === undefined) {
        this.$store.dispatch('fetch_user_list')
        return []
      }
      return this.$store.state.users
    },

    }

}
</script>

<style>

</style>