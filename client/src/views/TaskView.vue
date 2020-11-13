<template>
  <v-container>
    <v-row v-for="task in filterTaskList" :key="task.id" class="d-flex"
      ><v-card max-height="120px"
        ><v-text-field
          :value="task.title"
          solo
          flat
          dense
          align="center"
          @input="patchTask('title', $event)"
        >
        </v-text-field>
        <v-card-actions
          ><v-row
            ><v-col
              ><PatchTask
                class="justify-start"
                :task-id="task.id"
                :dialog="patchTaskDisplay"
                @click="showPatchTask"/></v-col
            ><v-spacer></v-spacer
            ><v-col> <DeleteButton :item-id="task.id" service="tasks"/></v-col
          ></v-row>
        </v-card-actions> </v-card
    ></v-row>
  </v-container>
</template>

<script>
//import app from '@/feathers-client'
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
      const data = {}
      data[key] = value /* 
      app.service('tasks').patch({id:}, data) */
    },
    showPatchTask() {
      this.patchTaskDisplay = !this.patchTaskDisplay
    }
  }
}
</script>

<style></style>
