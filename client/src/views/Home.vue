<template>
  <v-app>
    <NavBar />
    <BoardDrawer />
    <UserDrawer />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import BoardDrawer from '@/components/BoardDrawer'
import UserDrawer from '@/components/UserDrawer'
export default {
  name: 'Home',
  components: {
    NavBar,
    BoardDrawer,
    UserDrawer
  }
}
</script>

<style></style>
