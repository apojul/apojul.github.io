<template>
  <v-app>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters>
        <v-col v-for="(item, id) in boardsList" :key="id" cols="3">
          <v-card
            class="ma-2"
            color="blue lighten-3"
            :to="{ name: 'boardId', params: { id: item.id } }"
          >
            <v-card-title
              ><v-btn small depressed color="grey lighten-1">{{
                item.name
              }}</v-btn></v-card-title
            >
            <v-card-subtitle class="text-wrap">{{
              item['description']
            }}</v-card-subtitle>
            <v-card-actions>
              <v-btn
                fab
                text
                x-small
                class="ma-2"
                :to="{ name: 'user_id' }"
                @click="delBoard(item.id)"
              >
                <v-icon dark small>mdi-delete-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                fab
                text
                x-small
                class="ma-2"
                :to="{ name: 'PatchBoard', params: { id: item.id } }"
              >
                <v-icon dark left>mdi-pencil-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card> </v-col
        ><v-col
          ><v-btn small depressed color="grey lighten-4" class="text-lowercase"
            ><v-icon dark small>mdi-plus</v-icon>Create new board</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    boardsList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    }
  },
  methods: {
    delBoard(id) {
      this.$store.dispatch('del_board', id)
    }
  }
}
</script>

<style></style>
