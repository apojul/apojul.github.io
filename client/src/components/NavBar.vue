<template>
  <v-container>
    <v-app-bar 
      app
      flat 
      absolute 
      class="indigo"
      clipped-left
      clipped-right
      extension-height="100%"
      >
      <v-toolbar-title class="text-uppercase lighten3 orange--text">
        <span class="font-weight-light">a&p project</span>
        <span class="font-weight-black">manager</span>
      </v-toolbar-title>
      <v-spacer>
      </v-spacer>
      <div v-if="!this.$store.state.activeUser">
        <register />
        <login />
      </div>
      <div v-else>
        <userProfile class="mx-3"/>
        <logout />
      </div>
    </v-app-bar>
      <div v-if="this.$store.state.activeUser" >
      <boardNavDrawer />
      <otherUsersDrawer />   
      </div>
  </v-container>
</template>

<script>
import register from "@/components/Register"
import login from "@/components/LogIn"
import boardNavDrawer from "@/components/BoardsNavDrawer";
import userProfile from "@/components/UserProfile";
import logout from "@/components/LogOut"
import otherUsersDrawer from "@/components/OtherUsersDrawer"

export default {
  name: "NavBar",
  components: {
    boardNavDrawer,
    register,
    login,
    userProfile,
    logout,
    otherUsersDrawer
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
