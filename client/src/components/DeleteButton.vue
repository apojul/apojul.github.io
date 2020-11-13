<template>
  <v-btn fab icon x-small @click.stop="deleteItem">
    <v-icon> mdi-delete-empty</v-icon>
    <slot></slot>
  </v-btn>
</template>

<script>
import app from '@/feathers-client'
export default {
  name: 'DeleteButton',
  props: {
    itemId: {
      type: Number,
      required: true
    },
    service: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteItem() {
      app.service(this.service).remove(this.itemId)
    }
  }
}
</script>

<style></style>
