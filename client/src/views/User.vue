<template>
  <v-app>
    <router-view />
        <v-container class="grey lighten-5 mb-6">
          <v-row no-gutters style="height: 150px;">
            <v-col v-for="(item, property, index) in boardList" :key="index">
              <v-card
                class="pa-2"
                outlined
                tile
                height="400"
                :to="{ name: 'boardId', params: { id: item.id } }"
              >
                {{ item['name'] }}
                <v-row no-gutters style="height: 150px;">
                  <v-col
                    v-for="(ite, propert, ind) in columnList"
                    :key="ind"
                    cols="4"
                    height="800"
                  >
                    <v-card class="mx-2" outlined tile height="300">
                      {{ ite['name'] }}
                      <v-col no-gutters style="height: 30px;">
                        <v-col v-for="n in 6" :key="n">
                          <v-card height="20"></v-card>
                        </v-col>
                      </v-col>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      <v-container v-if="show" fluid fill-height>
        <BoardView />
      </v-container>
    
  </v-app>
</template>

<script>
// TODO Filter BoardList by UserId
// TODO extraire nav bar
// changer pascal pour authUse
  
export default {
  components: {},
  data() {
    return {
      show: false
    }
  },
  computed: {
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    },
    columnList() {
      if (this.$store.state.columns === undefined) {
        this.$store.dispatch('fetch_column_list')
        return []
      }
      return this.$store.state.columns
    },
  }
}
</script>

<style></style>
