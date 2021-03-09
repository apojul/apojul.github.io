<template>
  <v-app>
    <v-main>
      <router-view> </router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Footer
  }
}
</script>

<style>
/*m.container {
  border: 1px solid green;
}
.row {
  border: 1px solid red;
}
.col {
  border: 1px solid blue;
} */
</style>
