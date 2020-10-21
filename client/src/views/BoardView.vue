:<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list>
      <v-subheader>BOARD {{ this.$route.params.id }} </v-subheader>
      <v-list-item-group v-if="$route.params.id" color="primary">
        <v-list-item>
          <PatchBoard />
        </v-list-item>
        <v-list-item v-for="(item, property, i) in getBoard" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ property }}</v-list-item-title>
            <v-list-item-subtitle>{{ item }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-btn class="ma-2" color="orange darken-3" dark :to="{ name: 'user_id' }">
      <v-icon dark left> mdi-arrow-left </v-icon>Back
    </v-btn>
  </v-card>
</template>

<script>
import PatchBoard from '@/components/PatchBoard'

export default {
  components: { PatchBoard },
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
    filter() {
      return this.$store.state.userList.filter(user => user.id === 2)
    } /* ,
    users: () => {
      this.$store.getters.userSet
    },
    boards: () => this.$store.state.boards */
  },
  methods: {}
}
</script>
