<template>
 <v-container>
  <v-card>  
  </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AddColumn',
  data() {
    return {

    }
  },
  computed: {
  //
  },
  methods: {
    submitColumn() {
       const newColumn = {
        name: this.name,
        description: this.description,
        created_by: this.creator
      }
      this.$store.dispatch('create_column', newColumn )
    }
  }
}
</script>

<style>

</style>