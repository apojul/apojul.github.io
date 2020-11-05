:<template>
  <v-app>
    <v-app-bar absolute flat class="pb-4" color="purple ligthen-2">
      <v-col cols="2">
        <v-text-field
          :value="getBoard['name']"
          solo
          flat
          dense
          background-color="grey lighten-4"
          class="ms-8 mt-6"
          @input="handleInput('name', $event)"
        >
        </v-text-field
      ></v-col>
      <v-spacer></v-spacer>
      <v-btn icon>
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
          <v-col v-for="(item, property, i) in getColumnList" :key="i">
            <v-card flat class="mx-auto" color="grey lighten-4">
              <v-card-subtitle class="py-1">{{ item.name }}</v-card-subtitle
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
                <v-card-text class="mt-n2 mb-n4"> {{ item.name }} </v-card-text
                ><v-icon small class="ml-4">mdi-menu</v-icon
                ><v-icon small class="ml-4">mdi-attachment</v-icon>
                <v-btn x-small text>2</v-btn>
              </v-card>
              <v-btn small depressed text color="grey lighten-1"
                ><v-icon dark small>mdi-plus</v-icon>Add another task</v-btn
              >
            </v-card>
          </v-col>
          <v-col>
            <v-btn small depressed color="grey lighten-4"
              ><v-icon dark small>mdi-plus</v-icon>Add another list</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import app from '@/feathers-client'
export default {
  components: {},
  data() {
    return {
      boardId: this.$route.params.id
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
    columnList() {
      if (this.$store.state.columns === undefined) {
        const columnList = app.service('column').find()
        this.store.commit('SET_COLUMNS', columnList)
        return []
      }
      return this.$store.state.columns
    },
    getColumnList() {
      return Object.values(this.columnList).filter(
        column => column.board_id === this.boardId
      )
    },
    filter() {
      return this.$store.state.userList.filter(user => user.id === 2)
    }
  },
  methods: {}
}
</script>
