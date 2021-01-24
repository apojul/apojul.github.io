<template>
  <div>
    <NavBar />
    <UserDrawer />
    <router-view id="home-view"></router-view>
  </div>
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
