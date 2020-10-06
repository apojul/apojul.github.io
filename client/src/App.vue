<template>
  <v-app>
    <div class="page-header">
      <h1>Kanban Board</h1>
    </div>
    <div>
      <!-- <navBar></navBar> -->
    </div>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},

  data: () => ({
    //
  })
}
</script>

<style>
.page-header h1 {
  font-weight: 300;
}
</style>
