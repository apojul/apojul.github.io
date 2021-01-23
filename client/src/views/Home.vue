<template>
  <v-container fill-height>
    <NavBar />
    <UserDrawer />
    <router-view id="home-view"></router-view>
  </v-container>
</template>

<script>
import NavBar from '@/components/NavBar'
import UserDrawer from '@/components/UserDrawer'

export default {
  name: 'Home',
  components: {
    NavBar,
    UserDrawer
  }
}
</script>

<style></style>
