:<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col v-for="(item, property, i) in getColumnList" :key="i">
          <v-card class="mx-auto" max-width="300" tile>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-col> </v-col>
            <v-btn
              class="ma-2"
              color="orange darken-3"
              dark
              :to="{ name: 'user_id' }"
            >
              <v-icon dark left> mdi-arrow-left </v-icon>Back
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
//import PatchBoard from '@/components/PatchBoard'

export default {
  //components: { PatchBoard },
  data() {
    return {}
  },
  computed: {
    getBoard() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        console.log('fetch_board_list dispatched from BoardView.vue')
        return []
      }
      if (this.$route.params.id) {
        return this.$store.state.boards[this.$route.params.id]
      } else {
        return [['no board']]
      }
    },
    columnList() {
      if (this.$store.state.columns === undefined) {
        this.$store.dispatch('fetch_column_list')
        return []
      }
      return this.$store.state.columns
    },
    getColumnList() {
      const boardId = this.$route.params.id
      return Object.values(this.columnList).filter(
        column => column.created_on === boardId
      )
    },
    filter() {
      return this.$store.state.userList.filter(user => user.id === 2)
    }
  },
  methods: {}
}
</script>
