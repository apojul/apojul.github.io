<template>
  <div>
    <div>
      <router-link to="/boardList">List of Boards</router-link><br /><br />
      <router-link to="/boardNew">Create a new Board</router-link>
    </div>
    <v-card>
      <v-card-actions>
        <v-btn color="primary" @click="handleLogout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$store.dispatch('logout')
      //window.localStorage.removeItem('feathers-jwt')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
