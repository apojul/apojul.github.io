<template>
  <div>
    <boardsList />
    <CreateBoard />
  </div>
</template>

<script>
//import { mapState, mapGetters } from "vuex";
import CreateBoard from "@/components/CreateBoard";
import boardsList from "@/components/boardsList";
export default {
  name: "Boards",
  components: {
    CreateBoard,
    boardsList
  }
  //ecrire explicitement la computed boards
};
</script>
