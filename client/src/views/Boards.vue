<template>
  <container>
    <v-flex>
      <DisplayBoard />
    </v-flex>
   
  </container>
</template>

<script>
import DisplayBoard from "@/components/DisplayBoard";
export default {
  name: "Boards",
  components: {
    DisplayBoard
  }

};
</script>
