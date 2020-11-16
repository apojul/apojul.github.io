:<template>
  <v-container fluid fill-height pa-0>
    <v-app
      ><v-img
        src="http://localhost:8080/img/saira-HukoEzQ6StQ-unsplash.jpg"
        alt="pretty image"
      >
        <v-app-bar flat color="transparent">
          <v-row>
            <v-col cols="2">
              <v-text-field
                :value="getBoard['name']"
                solo
                flat
                dense
                background-color="blue lighten-4"
                class="mt-6"
                @input="patchBoard('name', $event)"
              >
              </v-text-field></v-col
            ><v-col justify-space-between></v-col
            ><v-col cols="2" class="pt-9">
              <v-btn dark icon @click="createColumn">
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn></v-col
            ></v-row
          >
        </v-app-bar>

        <v-container fluid pa-0>
          <v-row class="d-flex flex-nowrap py-3 overflow-auto"
            ><v-btn
              x-small
              class="ma-2"
              color="blue lighten-5"
              :to="{ name: 'user_id' }"
            >
              <v-icon left small> mdi-arrow-left </v-icon>Back
            </v-btn>
            <v-col v-for="column in filterColumnList" :key="column.id" cols="2">
              <Column :column-id="column.id" />
            </v-col> </v-row
        ></v-container>
      </v-img> </v-app
  ></v-container>
</template>

<script>
import { debounce } from 'debounce'
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
    patchBoard: debounce(async function(field, value) {
      const data = {}
      data[field] = value
      app.service('boards').patch({ id: this.$route.params.id }, data)
    }, 800)
  }
}
</script>
