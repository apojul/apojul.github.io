<template>
  <v-btn small depressed text color="grey lighten-1" @click="addTask"
    ><v-icon dark small>mdi-plus</v-icon>Add another task
  </v-btn>
</template>

<script>
import app from '@/feathers-client'

export default {
  name: 'AddTask',
  props: {
    columnId: {
      type: Number,
      required: true
    }
  },
  methods: {
    addTask() {
      app.service('tasks').create({
        column_id: this.columnId,
        title: 'New Task',
        user_id: this.$store.state.activeUserId
      })
    }
  }
}
</script>

<style></style>
