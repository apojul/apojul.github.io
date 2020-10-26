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
            <v-toolbar-title>Sign Up to Kanban Board</v-toolbar-title>
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
                    <v-btn block depressed color="success" @click="handleSignUp"
                      >Sign Up</v-btn
                    ></v-card-actions
                  >
                  /
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
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleSignUp() {
      const user = {
        full_name: this.name,
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('post_user', user)
      await this.$store.dispatch('log_in', {
        email: this.email,
        password: this.password
      })
      this.$router.replace({
        name: 'user_id'
      })
    }
  }
}
</script>
