<template>
  <container>
    <v-flex>
      <DisplayBoard />
    </v-flex>
   
  </container>
</template>

<script>
import DisplayBoard from "@/components/DisplayBoard";
import app from '@/feathers-client'
export default {
    async mounted() {
    let conUser = await app.service('con_users').create({})
    console.log(conUser)
  },

  name: "Boards",
  components: {
    DisplayBoard
  }
  //ecrire explicitement la computed boards
};
</script>
