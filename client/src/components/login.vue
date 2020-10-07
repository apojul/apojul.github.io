<template>
  <div>
    <v-card class="mx-auto" max-width="400" tile>
      <v-card-title>
        <h2>Please Log In</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field :v-model="email" label="Email"></v-text-field>
          <p>{{ email }}</p>
          <v-text-field :v-model="full_name" label="User Name"></v-text-field>
          <p>{{ full_name }}</p>
          <v-text-field
            :v-model="password"
            type="password"
            label="password"
          ></v-text-field>
          <p>{{ password }}</p>
          <v-spacer></v-spacer>
          <v-btn text @click="authenticateUser" class="red mx-0 mt-3"
            >Log In</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// TODO
// - create "current user state object"
// - create mutation for current user LOG_IN
// - create mutation for logging out (curent user = null)
// test hard authentification (feathers-client) #1
/*
    Create a login page en the router/index.js
    see what kind of event is created by the authentication
    => with the event we will mutate state to create current user

*/
export default {
  name: "Log_in",
  data: () => {
    return {
      full_name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    authenticateUser() {
      this.$store.dispatch("AUTHENTICATE_USER", {
        full_name: this.full_name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style></style>
