<template
  ><v-container fluid class="pa-0 ma-0">
    <v-app>
      <v-app-bar flat dark color="primary" class="ont-weight-bold"
        ><v-spacer></v-spacer
        ><v-toolbar-title class="display-1"> Kanban Board</v-toolbar-title
        ><v-spacer></v-spacer
      ></v-app-bar>

      <v-img
        src="http://localhost:8080/img/lucas-davies-eoaim05D5bM-unsplash.jpg"
        alt="pretty image"
        ><v-card
          max-width="400"
          class="mx-auto mt-6"
          flat
          color="transparent"
          height="100%"
        >
          <v-app-bar flat dark depressed color="primary">
            <v-spacer></v-spacer>
            <v-toolbar-title>Log In to Kanban Board</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-container>
            <v-card flat color="transparent">
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    dense
                    class="white align-baseline"
                    prepend-icon="mdi-email"
                    placeholder="Enter email"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    dense
                    class="white align-baseline"
                    prepend-icon="mdi-lock"
                    placeholder="Enter password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  depressed
                  color="light-blue lighten-5 headline font-weight-medium"
                  @click="handleSignin"
                  >Login</v-btn
                >
              </v-card-actions>
              <p class="text-center text--secondary">or</p>
              <v-card-actions>
                <v-btn
                  block
                  class="text-lowercase"
                  href="http://localhost:3030/oauth/google"
                  @click="loading"
                  ><v-icon left>mdi-google</v-icon>Login with Google</v-btn
                >
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  block
                  class="text-lowercase"
                  href="http://localhost:3030/oauth/facebook"
                  @click="loading"
                  ><v-icon left>mdi-facebook</v-icon> Login with Facebook</v-btn
                >
              </v-card-actions>
              <v-card-actions>
                <v-btn
                  block
                  class="text-lowercase"
                  href="http://localhost:3030/oauth/github"
                  @click="loading"
                  ><v-icon left>mdi-github</v-icon> Login with Github</v-btn
                > </v-card-actions
              ><v-divider inset class="ma-6"></v-divider>
              <div
                class="text-center text-capitalize mb-2 light-blue lighten-4"
              >
                <p>
                  <router-link
                    class="black--text body-2"
                    :to="{ name: 'Forgot' }"
                  >
                    Can't log in ? </router-link
                  >&#8226;
                  <router-link
                    class="black--text body-2"
                    :to="{ name: 'SignUp' }"
                    >Sign up for an account</router-link
                  >
                </p>
              </div>
            </v-card>
          </v-container>
        </v-card>
      </v-img>
    </v-app>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSignin() {
      await this.$store.dispatch('log_in', {
        email: this.email,
        password: this.password
      })
    },
    loading() {
      this.$store.commit('SET_LOADING')
      console.log('loading : ', this.$store.state.loading)
    }
  }
}
</script>
