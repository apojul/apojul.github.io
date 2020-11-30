<template>
  <v-container
    ><v-card
      v-for="(task, index) in tasksInColumnArray(columnId)"
      :key="index"
      class="d-flex"
      draggable
      @dragstart.stop="pickTask($event, index, tasksInColumnArray(columnId))"
      @dragenter.stop.prevent
      @drop.prevent="
        dropTask($event, tasksInColumnArray(columnId), index, columnId)
      "
      ><v-card-text
        >id: {{ task.id }} --- rank: {{ task.rank
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
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      patchTaskDisplay: false,
      fromColumnId: Number,
      toColumnId: Number,
      fromTaskIndex: Number,
      dragTaskList: [],
      dropTaskList: []
    }
  },
  computed: {
    ...mapGetters(['columnsInBoardArray', 'tasksInColumnArray']),
    taskArray() {
      return id => {
        return this.tasksInColumnArray(id)
      }
    }
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
    },
    pickTask(event, dragTaskIndex, dragTaskList) {
      console.log(document.getElementById('board').offsetHeight)
      // effects
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'

      event.dataTransfer.setData('from-task-index', dragTaskIndex)
      event.dataTransfer.setData('from-task-list', JSON.stringify(dragTaskList))
    },
    dropTask(event, dropTaskList, dropTaskIndex, toColumnId) {
      const fromTaskIndex = parseInt(
        event.dataTransfer.getData('from-task-index')
      )
      const dragTaskList = JSON.parse(
        event.dataTransfer.getData('from-task-list')
      )
      const fromTask = dragTaskList[fromTaskIndex]
      console.log('fromTaskArray', this.$store.state.fromTaskArray)
      console.log(
        'dragTaskList',
        dragTaskList.map(task => task.id)
      )
      console.log(
        'dropTaskList',
        dropTaskList.map(task => task.id)
      )
      let spliceTask = (fromList, fromIndex, toIndex, toList) => {
        let list = toList === undefined ? fromList : toList
        //      let testIndex = toList.length === 0 ? (toIndex = 0) : toIndex
        list.splice(toIndex++, 0, fromList.splice(fromIndex, 1)[0])
      }
      if (fromTask.column_id === toColumnId) {
        fromTask.column_id = toColumnId
        // move item in tasks list
        spliceTask(dragTaskList, fromTaskIndex, dropTaskIndex)
      } else {
        // move item in tasks list
        let toIndex =
          dropTaskIndex === dropTaskList.length - 1
            ? (dropTaskIndex = dropTaskList.length)
            : dropTaskIndex
        spliceTask(dragTaskList, fromTaskIndex, toIndex, dropTaskList)

        for (let i = 0; i < dropTaskList.length; i++) {
          app.service('tasks').patch(dropTaskList[i].id, {
            rank: i
          })
        }
        app.service('tasks').patch(fromTask.id, { column_id: toColumnId })
      }
      console.log(
        'dragTaskList',
        dragTaskList.map(task => task.id)
      )
      console.log(
        'dropTaskList',
        dropTaskList.map(task => task.id)
      )
      // save new indexes and new column_id if need
      for (let i = 0; i < dragTaskList.length; i++) {
        app.service('tasks').patch(dragTaskList[i].id, { rank: i })
      }
    },
    removeItem(item) {
      this.dragTaskList.splice(this.dragTaskList.indexOf(item), 1)
    },
    removeItemAt(index) {
      this.dragList.splice(index, 1)
    },
    moveItem(fromIndex, toIndex) {
      if (toIndex === -1) {
        this.removeItemAt(fromIndex)
      } else {
        this.dropTaskList.splice(
          toIndex,
          0,
          this.dragTaskList.splice(fromIndex, 1)[0]
        )
      }
    }
  }
}
</script>

<style></style>
