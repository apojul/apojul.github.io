<template>
  <v-app-bar color="light-blue darken-3" max-height="72px" app dark>
    <v-toolbar-title>Kanban Board</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-responsive max-width="260">
      <v-btn
        class="mx-1"
        depressed
        dark
        color="light-blue darken-1"
        :to="{ name: 'LogIn' }"
      >
        <span>Sign In</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn
        class="mx-1"
        depressed
        dark
        color="light-blue darken-1"
        :to="{ name: 'SignUp' }"
      >
        <span>Sign up</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </v-responsive>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style></style>
