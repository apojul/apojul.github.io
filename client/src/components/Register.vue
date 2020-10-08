<template>
        <v-dialog
      v-model="registerDialog"
      persistent
      max-width="600px"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn 
        text 
        v-bind="attrs"
        v-on="on"
        >Register
        </v-btn>
        </template>
        <v-card>
        <v-card-title>
          <span class="headline">New User Registration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="What is you name ?"
                  required
                  v-model="newUserName"
                ></v-text-field>
                 <p>{{newUserName}}</p>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="What is your Email*"
                  required
                  v-model="newUserEmail"
                ></v-text-field>
                <p>{{newUserEmail}}</p>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Choose a password*"
                  type="password"
                  required
                  v-model="newUserPassword"
                ></v-text-field>
                 <p>{{newUserPassword}}</p>
              </v-col>
            </v-row>
        <v-btn 
          text 
          @click="registerUser" 
          class="green mx-0 mt-3"
        >
            Register
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          class="red mx-0 mt-3"
          text
          @click="registerDialog = false"
        >
          Close
        </v-btn>
          </v-container>
        </v-card-text>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    name : "register",
    data () {
        return {
            registerDialog: false,
            newUserPassword: "",
            newUserName: "",
            newUserEmail: "",
        }
    },
    methods : {
        registerUser () {
            // TODO insert loader 
            // TODO create and dispatch CREATE_USER action
            this.registerDialog = false
            return console.log('new user name : ', this.newUserName,
                        'new user email : ', this.newUserEmail,
                        'new user password : ', this.newUserPassword)
            
            
    }
    }
    
}
</script>