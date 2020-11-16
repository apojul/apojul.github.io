<template>
  <v-navigation-drawer
    :value="drawer"
    app
    clipped
    max-width="250"
    color="blue lighten-5"
  >
    <v-list nav class="overfow-y-auto" max-height="400">
      <v-list-item class="px-0">
        <v-list-item-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>{{ activeUser.full_name }}</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-group sub-group active-class="purple--text text--accent-4">
        <template #activator>
          <v-list-item-title>Board List</v-list-item-title>
        </template>
        <v-list-item
          v-for="board in boardList"
          :key="board.id"
          :to="{ name: 'boardId', params: { id: board.id } }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ board.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-group
        no-action
        sub-group
        active-class="purple--text text--accent-4"
        ><template #activator>
          <v-list-item-title>Actions</v-list-item-title>
        </template>
        <v-list-item-content>
          <v-list-item>
            <AddBoard />
          </v-list-item>
        </v-list-item-content>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import AddBoard from '@/components/AddBoard'

export default {
  name: 'BoardDrawer',
  components: {
    AddBoard
  },
  data() {
    return {
      //
    }
  },
  computed: {
    drawer() {
      return this.$store.state.boardDrawer
    },
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetch_board_list')
        return []
      }
      return this.$store.state.boards
    },
    ...mapGetters(['activeUser'])
  }
}
</script>

<style></style>
