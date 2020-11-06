<template>
  <v-btn
  fab
  icon
  x-small
  clipped-right
  @click="deleteColumn"
  >
      <v-icon> mdi-delete-empty</v-icon>
  </v-btn>
</template>

<script>
export default {
name: 'DeleteColumn',
props: {
    columnId : {
        type: Number,
        required: true
    }
},
methods: {
    deleteColumn(){
        this.$store.dispatch('del_column', this.columnId)
    }
}
}
</script>

<style>

</style>