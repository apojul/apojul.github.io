<template
  ><v-container fluid class="pa-0 ma-0">
    <v-app-bar color="light-blue darken-3" app dark>
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
      </v-responsive> </v-app-bar
    ><v-container fluid fill-height pa-0
      ><v-card>
        <v-img
          src="/img/billow926-GZB0ugb9a40-unsplash.jpg"
          alt="pretty image"
          height="800"
        ></v-img
      ></v-card>
    </v-container>
  </v-container>
</template>

<script>
export default {}
</script>

<style></style>
