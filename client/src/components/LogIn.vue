<template>
          <v-dialog
      v-model="logInDialog"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="indigo orange--text"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Log In 
        <v-icon
          color="orange"
        >
          mdi-login-variant
        </v-icon>
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="400" tile>
        <v-card-title>
          <h2>Please Log In</h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field 
              v-model="email" 
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="password"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn 
              text @click="closeDialog()" 
              class="green mx-0 mt-3"
            >
                Log In 
              <v-icon
                color="red darken-4"
              >
                mdi-login-variant
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="red mx-0 mt-3"
              text
              @click="logInDialog = false"
            >
              Close
              <v-icon
                color="green darken-4"
              >
                mdi-close
              </v-icon>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      </v-dialog>
</template>

<script>
export default {
     data () {
    return {
    logInDialog: false,
    email: "",  //binding is not working, this.email, does not work either
    password: "",
    }
  },
  methods: {
    closeDialog() {
      this.logInDialog = false
      return this.authenticateUser()
    },
    
    authenticateUser() {
      // this.logInDialog excecuted, consolo.log and dispatch not excecuted.
      console.log('email : ', this.email, 'password ,', this.password)

        this.$store.dispatch("AUTHENTICATE_USER", {
        email: this.email,
        password: this.password
      })      
    }
    
  }
}
</script>