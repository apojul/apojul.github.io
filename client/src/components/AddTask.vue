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
    displayedTasks: {
      type: Function,
      required: true,
      default: () => {}
    },
    columnId: {
      type: Number,
      required: true
    }
  },
  methods: {
    addTask() {
      const rankInit = this.displayedTasks(this.columnId).length
      app.service('tasks').create({
        title: 'New Task',
        column_id: this.columnId,
        user_id: this.$store.state.activeUserId,
        rank: rankInit
      })
    }
  }
}
</script>

<style></style>
