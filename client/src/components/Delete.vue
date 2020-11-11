<template>
  <v-btn
  fab
  icon
  x-small
  clipped-right
  @click="deleteItem"
  >
      <v-icon> mdi-delete-empty</v-icon>
  </v-btn>
</template>

<script>
import app from '@/feathers-client'
export default {
name: 'Delete',
props: {
    itemId : {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    }
},
methods: {
    deleteItem(){
    console.log('service', this.service, 'itemId', this.itemId);
        app.service(this.service).remove(this.itemId)
    }
}
}
</script>

<style>

</style>