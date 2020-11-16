<template>
  <v-app>
    <v-img
      src="http://localhost:8080/img/natural-wonders-1400924-1600x1200.jpg"
      alt="pretty image"
      ><v-container fluid pa-0>
        <v-row class="d-flex flex-nowrap py-3 overflow-auto">
          <v-col v-for="board in boardsList" :key="board.id" cols="2">
            <v-card
              class="ma-2"
              color="blue lighten-3"
              @click.prevent.stop="goToBoard(board.id)"
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
                <v-row
                  ><v-col cols="3">
                    <DeleteButton
                      :item-id="board.id"
                      service="boards"
                      @click="deleteChange"
                    /> </v-col
                  ><v-spacer></v-spacer
                  ><v-col cols="3">
                    <v-btn
                      fab
                      icon
                      x-small
                      class="ma-2"
                      :to="{ name: 'PatchBoard', params: { id: board.id } }"
                    >
                      <v-icon dark small color="primary">mdi-pencil</v-icon>
                    </v-btn></v-col
                  ></v-row
                >
              </v-card-actions>
            </v-card> </v-col
          ><v-col cols="2"
            ><v-btn
              small
              depressed
              color="grey lighten-3"
              class="text-lowercase ma-2"
              @click="addBoard"
              ><v-icon dark small>mdi-plus</v-icon>Create new board</v-btn
            ></v-col
          >
        </v-row></v-container
      ></v-img
    >
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
    return {
      deleteTrue: true
    }
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
        user_id: this.$store.state.activeUserId
      }
      app.service('boards').create(newBoard)
    },
    deleteChange() {
      this.deleteTrue = false
    },
    goToBoard(id) {
      if (this.deleteTrue) {
        this.$router.push({ name: 'boardId', params: { id: id } })
      }
      this.deleteTrue = true
    }
  }
}
</script>

<style></style>
