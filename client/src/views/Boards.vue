<template>
  <container>
    <v-flex>
      <boardNav />
      <DisplayBoard />
    </v-flex>
   
  </container>
</template>

<script>
import boardNav from "@/components/BoardsNavDrawer";
import DisplayBoard from "@/components/DisplayBoard";
export default {
  name: "Boards",
  components: {
    boardNav,
    DisplayBoard
  }
  //ecrire explicitement la computed boards
};
</script>
