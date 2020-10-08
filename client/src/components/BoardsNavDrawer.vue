<template>
  <v-container fill-height>
  <v-card width="256" >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card></v-container>

</template>
<script>

/*this element will display a list of boards, once a board is chosen it will appear in the main window.
there will be two sub components :
BoardList : will generate and display the list of boards
Create Board : a dialog that will create a new board

*/
export default {
  name: "BoardDrawer",
  data () {
    return {
      boards: this.$store.state.boards
      
    }
  },
}

</script>