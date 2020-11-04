<template>
  <v-app>
    <v-app-bar
      flat
      color="white"
      class="pa-2 font-weight-bold"
      max-height="100px"
      ><v-spacer></v-spacer><v-toolbar-title> Kanban Board</v-toolbar-title
      ><v-spacer></v-spacer
    ></v-app-bar>

    <v-main>
      <v-container
        ><v-card max-width="400" class="mx-auto">
          <v-app-bar flat depressed color="pink lighten-4">
            <v-spacer></v-spacer>
            <v-toolbar-title>Log In to Kanban Board</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-app-bar>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card flat>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        v-model="email"
                        label="Email"
                        placeholder="Enter email"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        label="password"
                        placeholder="Enter password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block depressed color="success" @click="handleSignin"
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
                      ><v-icon left>mdi-facebook</v-icon> Login with
                      Facebook</v-btn
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
                  <div>
                    <p class="text-center text-capitalizecase mb-2">
                      <router-link :to="{ name: 'Forgot' }">
                        Can't log in ? </router-link
                      >&#8226;
                      <router-link :to="{ name: 'SignUp' }"
                        >Sign up for an account</router-link
                      >
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Andres Pascal</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
//import app from '@/feathers-client'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  // async mounted() {
  //   if (this.$route.hash) {
  //     const data = this.$route.hash.split('=')[1]
  //     console.log(data)
  //     await app.authenticate({
  //       strategy: 'jwt',
  //       accessToken: data
  //     })
  //     return this.loading()
  //   }
  // },
  methods: {
    async handleSignin() {
      await this.$store.dispatch('log_in', {
        email: this.email,
        password: this.password
      })
    },
    loading() {
      this.$store.commit('SET_LOADING')
      console.log('loading : ', this.$state.loading);
    }
  }
}
</script>
