<template>
  <v-btn fab icon x-small clipped-right @click.stop="deleteItem">
    <v-icon> mdi-delete-empty</v-icon>
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
      if (this.service === 'boards') {
        this.$router.replace({
          name: 'user_id',
          params: { userName: this.$store.state.activeUser.nickname }
        })
      }
    }
  }
}
</script>

<style></style>
