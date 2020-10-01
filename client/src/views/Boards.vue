<template>
  <div class="boards-view">
    <input> 
    <ul>
      <li 
				v-for="board in boardList" 
				:key="board.id">
				{{ board.name }}
      </li>
      <p>there are curently {{ boardList.lenght }} boards</p>
    </ul>
  <CreateBoard/>
  </div>
</template>

<script>
//import { mapState, mapGetters } from "vuex";
import CreateBoard from "@/components/CreateBoard";
export default {

  //ecrire explicitement la computed boards
  computed: {
    boardList () {
      if (this.$store.state.boards === undefined) {
        this.$store.dispatch("FETCH_BOARD_LIST")
        return []
      } else {
         return Object.values(this.$store.state.boards)
      } 
      
    }
  },
  components: {
    CreateBoard
  }
};
</script>
