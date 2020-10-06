<template>
  <v-toolbar app>
    <v-toolbar-title>
      <v-btn flat :to="{ name: 'home' }">Trello Clone</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn flat :to="{ name: 'login' }">Login</v-btn>
      <v-btn flat :to="{ name: 'signup' }">SignUp</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-btn flat @click="logout">LogOut</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['user', 'logout']
}
</script>
