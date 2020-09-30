<template>
  <div class="boards-view">
    <ul>
      <li 
				v-for="board in boards" 
				:key="board.id">
				{{ board.name }}
      </li>
      <p>there are curently {{ countBoards }} boards</p>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("loadBoards");
  },
  computed: {
    ...mapState(["boards"]),
    ...mapGetters(["countBoards"])
  }
  
};
</script>
