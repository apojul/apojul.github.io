<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <ul>
        <li v-for="board in boardList" :key="board.id">{{ board.name }}</li>
        <p>there are curently {{ boardList.length }} boards</p>
      </ul>
    </div>
    <div>
      <p>New board : {{ getNewBoard ? getNewBoard : 'no' }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  // data() {
  //   return {}
  // },
  computed: {
    boardList() {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch('fetchBoardList')
        return []
      }
      return Object.values(this.$store.state.boards)
    },
    ...mapGetters(['getNewBoard'])
  }
}
</script>
