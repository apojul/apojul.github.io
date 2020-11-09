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
          @input="handleInput('name', $event)"
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
          <v-col v-for="(item, property, i) in filterColumnList" :key="i">
            <v-card flat class="mx-auto" color="grey lighten-4">
              <v-card-subtitle class="py-1"
                >{{ item.name }}
                <DeleteColumn :column-id="item.id" clipped-right />
                <PatchColumn
                  :column-id="item.id"
                  :dialog="patchColumnDisplay"
                  @click="showPatchColumn"
                /> </v-card-subtitle
              ><v-card>
                <v-card
                  flat
                  dark
                  height="100px"
                  color="green lighten-1"
                  class="px-auto"
                  ><v-card-actions class="d-flex justify-end"
                    ><v-btn
                      depressed
                      x-small
                      fab
                      tile
                      color="green lighten-1"
                      class="d-flex"
                      ><v-icon>mdi-pencil-outline</v-icon></v-btn
                    ></v-card-actions
                  >
                  <v-card-title class="d-flex justify-center mt-n7">{{
                    item.name
                  }}</v-card-title></v-card
                >
                <v-card-text class="mt-n2 mb-n4"> {{ item.id }} </v-card-text
                ><v-icon small class="ml-4">mdi-menu</v-icon
                ><v-icon small class="ml-4">mdi-attachment</v-icon>
                <v-btn x-small text>2</v-btn>
              </v-card>
              <DisplayTasks :column-id="item.id" />
              <AddTask :column-id="item.id"/>             
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DisplayTasks from '@/components/DisplayTasks.vue'
import DeleteColumn from '@/components/DeleteColumn'
import PatchColumn from '@/components/PatchColumn'
import AddTask from '@/components/AddTask'
import app from '@/feathers-client'

export default {
  components: {
    DisplayTasks,
    DeleteColumn,
    PatchColumn,
    AddTask
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
        console.log('fetch_board_list dispatched from BoardView.vue')
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
    async   handleInput(field, value) {
      const data = {}
      data[field] = value
      app.service('boards').patch({id: this.$route.params.id}, data) 
      console.log(
        'patch_board payload id :',
        this.$route.params.id,
        'data: ',
        data
      )
    }
  }
}
</script>
