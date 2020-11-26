<template>
  <v-container
    ><v-card
      v-for="(task, taskIndex) in tasksIncolumnsArray(columnId)"
      :key="taskIndex"
      class="d-flex"
      ><v-card-text
        >id: {{ task.id
        }}<v-text-field
          :value="task.title"
          solo
          flat
          dense
          align="center"
          @input="patchTask(task.id, 'title', $event)"
        >
        </v-text-field>
        <v-card-actions
          ><v-row
            ><v-col cols="3"
              ><PatchTask
                class="justify-start"
                :task-id="task.id"
                :dialog="patchTaskDisplay"
                @click="showPatchTask"/></v-col
            ><v-spacer></v-spacer
            ><v-col cols="3">
              <DeleteButton :item-id="task.id" service="tasks"/></v-col
          ></v-row>
        </v-card-actions> </v-card-text></v-card
  ></v-container>
</template>

<script>
import { debounce } from 'debounce'
import app from '@/feathers-client'
import PatchTask from '@/components/PatchTask'
import DeleteButton from '@/components/DeleteButton'
import { mapGetters } from 'vuex'

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
    ...mapGetters(['columnsInBoardArray', 'tasksIncolumnsArray'])
  },
  methods: {
    patchTask: debounce(function(id, key, value) {
      const data = {}
      data[key] = value
      console.log('ext')
      app.service('tasks').patch({ id: id }, data)
    }, 800),
    showPatchTask() {
      this.patchTaskDisplay = !this.patchTaskDisplay
    }
  }
}
</script>

<style></style>
