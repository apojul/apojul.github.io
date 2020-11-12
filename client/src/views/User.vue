<template>
  <v-app>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters>
        <v-col v-for="(board, key) in boardsList" :key="key" cols="3">
          <v-card
            class="ma-2"
            color="blue lighten-3"
            :to="{ name: 'boardId', params: { id: board.id } }"
          >
            <v-card-title
              ><v-btn small depressed color="grey lighten-1">{{
                board.name
              }}</v-btn></v-card-title
            >
            <v-card-subtitle class="text-wrap">{{
              board['description']
            }}</v-card-subtitle>
            <v-card-actions>
              <DeleteButton :item-id="board.id" service="boards" />

              <v-btn
                fab
                icon
                x-small
                class="ma-2"
                :to="{ name: 'PatchBoard', params: { id: board.id } }"
              >
                <v-icon dark small left>mdi-pencil-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card> </v-col
        ><v-col
          ><v-btn
            small
            depressed
            color="grey lighten-4"
            class="text-lowercase"
            @click="addBoard"
            ><v-icon dark small>mdi-plus</v-icon>Create new board</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import DeleteButton from '@/components/DeleteButton'

import app from '@/feathers-client'
export default {
  components: {
    DeleteButton
  },
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
    addBoard() {
      const newBoard = {
        name: 'New Board',
        description: '',
        user_id: this.$store.state.activeUser.id
      }
      app.service('boards').create(newBoard)
    }
  }
}
</script>

<style></style>
