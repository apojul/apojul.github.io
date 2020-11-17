<template>
  <v-row>
    <v-card flat class="mx-auto" color="grey lighten-4">
      <v-card-subtitle class="py-1"
        ><v-row dense>
          <v-col cols="10">
            <v-text-field
              solo
              flat
              dense
              class="ms-8 mt-6"
              :value="thisColumn.name"
              :description="thisColumn.name"
              @input="changeColumnName('name', $event)"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2" class="mx-0 px-0 ">
            <DeleteButton
              class="deleteButton"
              service="columns"
              :item-id="columnId"
            />
          </v-col> </v-row></v-card-subtitle
      ><v-card>
        <v-card flat dark height="100px" color="green lighten-1" class="px-auto"
          ><v-card-actions class="d-flex justify-end"
            ><v-btn
              depressed
              x-small
              fab
              tile
              color="green lighten-1"
              class="d-flex"
              ><v-icon>mdi-pencil-outline</v-icon></v-btn
            ></v-card-actions
          >
          <v-card-title class="d-flex justify-center mt-n7">{{
            thisColumn.name
          }}</v-card-title></v-card
        >
        <v-card-text class="mt-n2 mb-n4"> {{ columnId }} </v-card-text
        ><v-icon small class="ml-4">mdi-menu</v-icon
        ><v-icon small class="ml-4">mdi-attachment</v-icon>
        <v-btn x-small text>2</v-btn>
      </v-card>
      <v-card
        v-for="task in filterTaskList"
        :key="task.index"
        draggable
        @dragstart="startDraggingTask(task)"
        @dragend="dropTask(newColumn)"
      >
        <Task :column-id="columnId" :task-id="task.id" />
      </v-card>
      <v-card><AddTask :column-id="columnId"/></v-card> </v-card
  ></v-row>
</template>

<script>
import { debounce } from 'debounce'
import DeleteButton from '@/components/DeleteButton'
import Task from '@/views/TaskView'
import AddTask from '@/components/AddTask'
import app from '@/feathers-client'

export default {
  name: 'Column',
  components: {
    DeleteButton,
    Task,
    AddTask
  },
  props: {
    columnId: {
      type: Number,
      required: true
    },
    newColumn: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      draggingTask: undefined,
      droppingColumn: undefined
    }
  },
  computed: {
    thisColumn() {
      return this.$store.state.columns[this.columnId]
    },
    getTaskList() {
      if (this.$store.state.tasks === undefined) {
        this.$store.dispatch('fetch_task_list')
        return []
      }
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
    changeColumnName: debounce(function(key, value) {
      let data = {}
      data[key] = value
      app.service('columns').patch({ id: this.columnId }, data)
    }, 800),
    startDraggingTask(task) {
      if (task) {
        this.draggingTask = task
      }
    },
    dropTask(column) {
      if (column) {
        this.draggingTask.column_id = column.id
      }
      this.droppingColumn = undefined
      this.draggingTask = undefined
    }
  }
}
</script>

<style>
.col {
  cursor: pointer;
}
</style>
