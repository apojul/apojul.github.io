<template>
  <v-btn
    class="indigo orange--text"
    dark
    @click="logOut"
    >
      Log Out 
    <v-icon
    color="orange"
    >
      mdi-logout-variant
    </v-icon>
  </v-btn>
</template>
<script>
export default {
  methods: {
    logOut () {
      this.$store.dispatch("LOG_OUT")      
        }
    }
    
}
</script>