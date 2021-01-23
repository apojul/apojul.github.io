<template>
  <v-container fluid class="pa-0 ma-0">
    <v-app>
      <v-app-bar
        flat
        dark
        color="primary"
        class="font-weight-bold"
        max-height="80px"
        ><v-spacer></v-spacer
        ><v-toolbar-title class="display-1"> Kanban Board</v-toolbar-title
        ><v-spacer></v-spacer
      ></v-app-bar>
      <v-card max-width="400" class="mx-auto mt-10">
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
                  <v-form ref="form" v-model="isValid">
                    <v-text-field
                      v-model="name"
                      label="Name"
                      placeholder="Enter nickname"
                      :rules="nameRules"
                      error-count="2"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      placeholder="Enter email"
                      type="password"
                      prepend-icon="mdi-email"
                      :rules="emailRules"
                      error-count="2"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      label="password"
                      placeholder="Enter password"
                      prepend-icon="mdi-lock"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      error-count="5"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    :disabled="!isValid"
                    depressed
                    color="success"
                    @click="handleSignUp"
                    >Sign Up</v-btn
                  ></v-card-actions
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-app></v-container
  >
</template>

<script>
import app from '@/feathers-client'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || 'Nickname is required',
        v =>
          (v && v.length >= 3 && v.length <= 30) ||
          'Nickname must have 3-30 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must have 5+ characters',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([?!@$%])/.test(v) || 'Must have one special character [?!@#$%]'
      ],
      isValid: true,
      showPassword: false
    }
  },
  methods: {
    async handleSignUp() {
      const user = {
        nickname: this.name,
        email: this.email,
        password: this.password
      }
      await app.service('users').create(user)
      await this.$store.dispatch('log_in', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
