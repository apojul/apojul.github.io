<template>
  <v-app>
    <router-view />
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters style="height: 150px;">
        <v-col
          v-for="(item, property, index) in boardList"
          :key="index"
          cols="4"
        >
          <v-card
            class="ma-2"
            color="purple lighten-4"
            height="200"
            :to="{ name: 'boardId', params: { id: item.id } }"
          >
            <v-card-title>{{ item['name'] }}</v-card-title>
            <v-card-subtitle class="text-wrap">{{
              item['description']
            }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                fab
                small
                class="ma-2"
                color="purple darken-3"
                dark
                @click="delBoard(item.id)"
              >
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
               <v-btn
                fab
                small
                class="ma-2"
                color="purple darken-3"
                darkt
                :to=" { name:'PatchBoard', params: {id: item.id}} "
                > 
                  <v-icon dark left>mdi-update</v-icon>
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    },
  },
  methods: {
    delBoard(id) {
      this.$store.dispatch('del_board', id)
    }
  }
}
</script>

<style></style>
