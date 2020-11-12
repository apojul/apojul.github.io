:<template>
  <v-app>
    <v-app-bar absolute flat class="pb-4" color="blue ligthen-2">
      <v-col cols="2">
        <v-text-field
          :value="getBoard['name']"
          solo
          flat
          dense
          background-color="blue lighten-4"
          class="ms-8 mt-6"
          @input="patchBoard('name', $event)"
        >
        </v-text-field
      ></v-col>
      <v-spacer></v-spacer>
      <v-btn icon @click="createColumn">
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main no-wrap>
      <v-container>
        <v-row
          ><v-btn
            x-small
            class="ma-2"
            color="pink lighten-5"
            :to="{ name: 'user_id' }"
          >
            <v-icon left small> mdi-arrow-left </v-icon>Back
          </v-btn>
          <v-col v-for="item in filterColumnList" :key="item.id">
            <Column :column-id="item.id" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Column from '@/views/ColumnView'
import app from '@/feathers-client'

export default {
  components: {
    Column
  },
  data() {
    return {
      boardId: this.$route.params.id,
      columnId: undefined,
      column: {
        name: 'test_column'
      },
      patchColumnDisplay: false
    }
  },
  computed: {
    getBoard() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      if (this.boardId) {
        return this.$store.state.boards[this.boardId]
      } else {
        return [['no board']]
      }
    },
    getColumnList() {
      if (this.$store.state.columns === undefined) {
        this.$store.dispatch('fetch_column_list')
        return []
      }
      return this.$store.state.columns
    },
    filterColumnList() {
      return Object.values(this.getColumnList).filter(
        column => column.board_id === this.boardId
      )
    }
  },
  methods: {
    async createColumn() {
      let newColumn = { name: this.column.name, board_id: this.boardId }
      await app.service('columns').create({
        ...newColumn
      })
    },
    showPatchColumn() {
      this.patchColumnDisplay = !this.patchColumnDisplay
    },
    async patchBoard(field, value) {
      const data = {}
      data[field] = value
      app.service('boards').patch({ id: this.$route.params.id }, data)
    }
  }
}
</script>
