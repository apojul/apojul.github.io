<template>
  <v-card>
    <v-card-title>Login Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field label="password" v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="handleSignin">Login</v-btn>
    </v-card-actions>
  </v-card>
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
    handleSignin() {
      this.$store.dispatch('login', {
        full_name: this.name,
        email: this.email,
        password: this.password
      })
      this.$router.push({ name: 'board' })
    }
  }
}
</script>
