<template>
  <v-container>
    <p>{{ columnId }}</p>
    <v-card v-for="task in filterTaskList" :key="task.id">
      <v-card-title class="d-flex justify-center"
        ><v-text-field
          :value="task.title"
          solo
          flat
          dense
          @input="patchTask('title', $event)"
        >
        </v-text-field>
      </v-card-title>

      <v-card-actions>
        <PatchTask
          :task-id="task.id"
          :dialog="patchTaskDisplay"
          @click="showPatchTask"
        />
        <DeleteButton :item-id="task.id" service="tasks" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import app from '@/feathers-client'
import PatchTask from '@/components/PatchTask'
import DeleteButton from '@/components/DeleteButton'

export default {
  name: 'Task',
  components: {
    PatchTask,
    DeleteButton
  },
  props: {
    columnId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      patchTaskDisplay: false
    }
  },
  computed: {
    getTaskList() {
      /* if (this.$store.state.tasks === undefined) {
        this.$store.dispatch('fetch_task_list')
        return []
      } */
      return this.$store.state.tasks
    },
    filterTaskList() {
      let filteredTaskList = Object.values(this.getTaskList).filter(
        task => task.column_id === this.columnId
      )
      return filteredTaskList
    }
  },
  methods: {
    patchTask(key, value) {
      console.log('PatchTask', key, value)
      const data = {}
      data[key] = value
      app.service('tasks').patch(this, data)
    },
    showPatchTask() {
      this.patchTaskDisplay = !this.patchTaskDisplay
    }
  }
}
</script>

<style></style>
