<template>
  <v-app>
    <v-container class="grey lighten-5 mb-6">
      <v-row no-gutters>
        <v-col v-for="(item, key) in boardsList" :key="key" cols="3">
          <v-card
            class="ma-2"
            color="blue lighten-3"
            :to="{ name: 'boardId', params: { id: item.id } }"
          >
            <v-card-title
              ><v-btn small depressed color="grey lighten-1">{{
                item.name
              }}</v-btn></v-card-title
            >
            <v-card-subtitle class="text-wrap">{{
              item['description']
            }}</v-card-subtitle>
            <v-card-actions>
              <Delete 
              :item-id='item.id' 
              service='boards' 
              @click="back()"               
              /> 

              <v-btn
                fab
                icon
                x-small
                class="ma-2"
                :to="{ name: 'PatchBoard', params: { id: item.id } }"
              >
                <v-icon dark small left>mdi-pencil-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card> </v-col
        ><v-col
          ><v-btn
            small
            depressed
            color="grey lighten-4"
            class="text-lowercase"
            @click="addBoard"
            ><v-icon dark small>mdi-plus</v-icon>Create new board</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Delete from '@/components/Delete' 


import app from '@/feathers-client'
export default {
  components: {
    Delete
  },
  data() {
    return {}
  },
  computed: {
    boardsList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    }
  },
  methods: {
    delBoard(id) {
     app.service('boards').remove(id)
    },
    addBoard() {
      const newBoard = {
        name: 'New Board',
        description: '',
        user_id: this.$store.state.activeUser.id
      }
      app.service('boards').create(newBoard)
    },
    back () {
      this.$router.replace({
        name: 'user_id',
        params: { userName: this.$store.state.activeUser.nickname }
      })
    }
  }
}
</script>

<style></style>
