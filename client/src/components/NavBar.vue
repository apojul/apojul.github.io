<template>
  <v-container>
    <v-app-bar app flat class="indigo">
      <v-toolbar-title class="text-uppercase lighten3 orange--text">
        <span class="font-weight-light">a&p project</span>
        <span class="font-weight-black">manager</span>
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <register/>
      <login/>
    </v-app-bar>
  </v-container>
</template>

<script>
import register from "./Register"
import login from "./LogIn"

export default {
  name: "NavBar",
  components: {
    register,
    login
  },
  data () {
    return {

    }
  },
  
  computed: {
     /*
    intDialogVisible: {
      get: function () {
        if (this.dialogVisible) {
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
        }

        return this.dialogVisible
      },
      set: function (value) {
             if (!value) {
               this.$emit('close', some_payload)
             }
    }
}
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
