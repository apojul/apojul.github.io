<template>
  <v-container fluid fill-height>
    <v-app-bar flat color="transparent">
      <v-row dense>
        <v-col cols="2">
          <v-text-field
            :value="getBoard['name']"
            solo
            flat
            dense
            background-color="transparent"
            @input="patchBoard('name', $event)"
          >
          </v-text-field></v-col
      ></v-row>
    </v-app-bar>
    <v-row id="board"
      ><v-btn
        x-small
        class="ma-2"
        color="blue lighten-5"
        :to="{ name: 'user_id' }"
      >
        <v-icon left small> mdi-arrow-left </v-icon>Back </v-btn
      ><Column /></v-row
  ></v-container>
</template>

<script>
import { debounce } from 'debounce'
import Column from '@/views/ColumnView'
import app from '@/feathers-client'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Column
  },
  data() {
    return {
      boardId: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters(['boardsOfUserArray']),
    ...mapState(['boards']),
    getBoard() {
      if (this.boardsOfUserArray === undefined) {
        this.boards()
      }
      if (this.boardId) {
        return this.boards[this.boardId]
      } else {
        return [['no board']]
      }
    }
  },
  methods: {
    patchBoard: debounce(async function(field, value) {
      const data = {}
      data[field] = value
      app.service('boards').patch({ id: this.boardId }, data)
    }, 800)
  }
}
</script>
<style></style>
