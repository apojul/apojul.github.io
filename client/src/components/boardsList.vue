<template>
  
  <v-container class="my-5">
      
      <v-card flat v-for="board in boardList" :key="board.id">
        <v-layout row wrap :class="`pa-3 board ${board.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Board name</div>
            <div>{{ board.name }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Description</div>
            <div>{{ board.description }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Created by</div>
            <div>{{ board.created_by }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="caption grey--text">Private</div>
            <div>{{ board.is_private }}</div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
</template>

<script>
export default {
    // donde poner el v-for loop para que funcione bien? en v-list-item-title, crea una linea con muchos titutlos
computed: {
    boardList () {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch("FETCH_BOARD_LIST")
        return []
      } else {
         return Object.values(this.$store.state.boards)
      } 
      
    }
  },

}
</script>

<style>
</style>
