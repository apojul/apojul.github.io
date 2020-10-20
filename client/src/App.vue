<template>
  <v-app>
  <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted () {
    this.$router.push({ name: 'LoggedOut' })
  },
  name: "App",

  components: {
  },

};
</script>
