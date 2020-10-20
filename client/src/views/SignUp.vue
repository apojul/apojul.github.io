<template>
  <v-card>
    <v-card-title>Sign Up Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field v-model="email" label="Email"></v-text-field>
        <v-text-field v-model="password" label="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="handleSignUp">Register</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn :to="{ name: 'Home' }">Home</v-btn>
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
    handleSignUp() {
      this.$store.dispatch('postUser', {
        full_name: this.name,
        email: this.email,
        password: this.password
      })
      this.$router.replace({ name: 'Home' })
    }
  }
}
</script>
