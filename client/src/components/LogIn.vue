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
            <p>{{ email }}</p>
            <v-text-field
              v-model="password"
              type="password"
              label="password"
            ></v-text-field>
            <p>{{ password }}</p>
            <v-spacer></v-spacer>
            <v-btn 
              text @click="authenticateUser" 
              class="green mx-0 mt-3"
            >
                Log In
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="red mx-0 mt-3"
              text
              @click="logInDialog = false"
            >
              Close
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
    authenticateUser() {
      console.log('email : ', this.email, 'password ,', this.password)
      this.$store.dispatch("AUTHENTICATE_USER", {
        email: this.email,
        password: this.password
      })
      console.log('email : ', this.email, 'password ,', this.password)
      //this.logInDialog = false
     // TODO changer router à boards 
    }
    
  }
}
</script>