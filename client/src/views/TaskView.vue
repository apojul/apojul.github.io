<template>
  <v-container
    ><v-card>
      <v-row class="d-flex"
        ><v-card-text
          ><v-text-field
            :value="thisTask.title"
            solo
            flat
            dense
            align="center"
            @input="patchTask('title', $event)"
          >
          </v-text-field>
          <v-card-actions
            ><v-row
              ><v-col cols="3"
                ><PatchTask
                  class="justify-start"
                  :task-id="thisTask.id"
                  :dialog="patchTaskDisplay"
                  @click="showPatchTask"/></v-col
              ><v-spacer></v-spacer
              ><v-col cols="3">
                <DeleteButton :item-id="thisTask.id" service="tasks"/></v-col
            ></v-row>
          </v-card-actions> </v-card-text></v-row
    ></v-card>
  </v-container>
</template>

<script>
import { debounce } from 'debounce'
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
    },
    taskId: {
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
    thisTask() {
      return this.$store.state.tasks[this.taskId]
    }
  },
  methods: {
    patchTask: debounce(function(key, value) {
      const data = {}
      data[key] = value
      console.log('ext')
      app.service('tasks').patch({ id: this.taskId }, data)
    }, 800),
    showPatchTask() {
      this.patchTaskDisplay = !this.patchTaskDisplay
    }
  }
}
</script>

<style></style>
