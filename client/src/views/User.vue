<template>
  <v-container fluid>
    <v-row>
      <v-icon medium left color="black">mdi-account-multiple-outline</v-icon
      ><span class="black--text text-h6 pa-10">{{ activeUser.nickname }}</span>
    </v-row>
    <v-row class="d-flex flex-nowrap overflow-x-auto">
      <v-col
        v-for="board in boardArray"
        :key="board.id"
        class=""
        xs="9"
        sm="6"
        md="4"
        lg="3"
        @click.prevent.stop="goToBoard(board.id)"
      >
        <v-card class="ma-2 board" color="blue lighten-3">
          <v-img src="/img/billow926-Ihe81vz0VrI-unsplash.jpg" height="180">
            <v-card-title
              ><v-text-field
                :value="board.name"
                background-color="transparent"
                color="blue--text"
                solo
                flat
                dense
                @input="patchBoard(board.id, 'name', $event)"
              ></v-text-field
            ></v-card-title>
            <v-card-subtitle>{{ board['description'] }}</v-card-subtitle>
            <!-- <v-card-actions>
              <v-row
                ><v-col cols="2">
                  <DeleteButton :item-id="board.id" service="boards" /> </v-col
                ><v-spacer></v-spacer
                ><v-col cols="2"
                  ><PatchBoard
                    :board-id="board.id"
                    :dialog="patchBoardDisplay"
                    @click="showPatchBoard"/></v-col
              ></v-row> </v-card-actions
          > --></v-img
          >
        </v-card> </v-col
      ><v-col xs="9" sm="6" md="4" lg="3" class="" @click="addBoard"
        ><v-btn
          depressed
          class="ma-2 board"
          height="180"
          width="85%"
          color="grey lighten-3"
          flat
        >
          <v-card-actions>Create new board </v-card-actions>
        </v-btn></v-col
      >
    </v-row></v-container
  ></template
>

<script>
/**
import DeleteButton from '@/components/DeleteButton'
import PatchBoard from '@/components/PatchBoard'
*/
import { debounce } from 'debounce'
import app from '@/feathers-client'
import { mapState, mapGetters } from 'vuex'

export default {
  /**
  components: {
    DeleteButton,
    PatchBoard
  },
    */
  data() {
    return {
      patchBoardDisplay: false
    }
  },
  computed: {
    ...mapState(['activeUserId']),
    ...mapGetters({ boardArray: 'boardsOfUserArray' }),
    ...mapGetters(['activeUser'])
  },
  methods: {
    addBoard() {
      const newBoard = {
        name: 'New Board',
        description: '',
        user_id: this.activeUserId
      }
      app.service('boards').create(newBoard)
    },
    deleteChange() {
      this.deleteTrue = false
    },
    goToBoard(id) {
      this.$router.push({ name: 'boardId', params: { id: id } })
    },
    patchBoard: debounce(function(id, key, value) {
      const data = {}
      data[key] = value
      app.service('boards').patch(id, data)
    }, 800),
    showPatchBoard() {
      this.patchBoardDisplay = !this.patchBoardDisplay
    }
  }
}
</script>

<style>
.board {
  cursor: pointer;
}
.board:hover {
  filter: brightness(90%);
}
</style>
