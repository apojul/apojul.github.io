<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      app
      clipped-right
      class="indigo orange--text "
    >
      <v-list-item class="px-2">
        

        <v-list-item-title class="orange--text" >{{this.$store.state.activeUser.full_name}}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list >
        <v-list-item
          flat v-for="board in boardList" 
          :key="board.id"
          link
        >
          <v-list-item-icon>
            <v-icon > mdi-radiobox-marked</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title 
              class="orange--text"
              >{{ board.name }} by {{board.created_by}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <createBoard/>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import createBoard from "./CreateBoard"

/*this element will display a list of boards, once a board is chosen it will appear in the main window.
there will be two sub components :
BoardList : will generate and display the list of boards
Create Board : a dialog that will create a new board

*/
  export default {
    components: {
      createBoard
    },
    data () {
      return {
        drawer: true,
        mini: true,
      }
    },
    computed: {
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch("FETCH_BOARD_LIST");
        return [];
      } else {
        return Object.values(this.$store.state.boards);
      }
    }
  }
  }
</script>