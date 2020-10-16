<template>
  <v-app>
    <TempNavBar />
  <v-main>
      <router-view>

      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import TempNavBar from "@/components/TempNavBar"
export default {
  mounted () {
    this.$router.push({ path: '/loggedout' })
  },
  name: "App",

  components: {
    TempNavBar
  },

};
</script>
