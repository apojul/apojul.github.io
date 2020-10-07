<template>
  <v-container>
    <v-app-bar app flat class="indigo">
      <v-toolbar-title class="text-uppercase lighten3 orange--text">
        <span class="font-weight-light">project</span>
        <span class="font-weight-black">manager</span>
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <v-btn text @click="registerBtn">Register</v-btn>
      <v-btn text @click="login">Log In</v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  data () {
    return {
    logIn: false,
    register: false
    }
  },
  methods: {
    login() { 
      this.logIn = !this.logIn
      console.log('log in ', this.logIn)
       // this call a popup component that will do the login and dispatch the action
    },
    registerBtn() { 
      this.register = !this.register
      console.log('register ', this.register)
       // this call a popup component that will do the login and dispatch the action
    }/*
    /*
    /*buttonClass(path) {
      return {
        btn: true,
        "btn-primary": this.$route.path === path,
        "btn-secondary": this.$route.path !== path
      };
    }*/
  },
  computed: {
     /*
    logOut() {
      return this.$store.submit("LOG_OUT");
    }*/
  }
  //for the login/user menu => if activeUser! display login button else display user menu with logout option
};
</script>

<style>
.menubar {
  margin-bottom: 16px;
}
</style>
