:<template>
  <v-app>
    <div class="">
      <v-app-bar flat color="blue ligthen-2">
        <v-row height="50px">
          <v-col cols="3">
            <v-text-field
              :value="getBoard['name']"
              solo
              flat
              dense
              background-color="blue lighten-4"
              class="ms-8 mt-6"
              @input="patchBoard('name', $event)"
            >
            </v-text-field></v-col
        ></v-row>
        <v-spacer></v-spacer>
        <v-btn icon @click="createColumn">
          <v-icon>mdi-playlist-plus</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <v-container>
      <v-row class="d-flex flex-nowrap py-3 overflow-auto"
        ><v-btn
          x-small
          class="ma-2"
          color="pink lighten-5"
          :to="{ name: 'user_id' }"
        >
          <v-icon left small> mdi-arrow-left </v-icon>Back
        </v-btn>
        <v-col v-for="column in filterColumnList" :key="column.id" cols="3">
          <Column :column-id="column.id" />
        </v-col>
      </v-row>
    </v-container>
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
      newColumn: {
        name: 'another list'
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
    /* beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!vm.$store.state.boards[vm.boardId]) {
          next(false)
        }
      })
    }, */
    async createColumn() {
      let newColumn = { name: this.newColumn.name, board_id: this.boardId }
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
