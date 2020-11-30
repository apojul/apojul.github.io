<template>
  <v-row>
    <v-btn dark icon @click="createColumn">
      <v-icon>mdi-playlist-plus</v-icon>
    </v-btn>
    <v-col
      v-for="column in columnsInBoardArray(boardId)"
      :key="column.rank"
      cols="2"
    >
      <v-card
        flat
        class="mx-auto scroll-y"
        color="grey lighten-4"
        draggable
        max-height="20%"
        @dragstart.self="pickColumn($event, column.rank)"
        @dragover.prevent
        @drop.prevent="dropColumn($event, column.rank)"
      >
        <v-card-subtitle class="py-1"
          ><v-row dense>
            <v-col cols="10">
              <v-text-field
                solo
                flat
                dense
                class="ms-8 mt-6"
                :value="column.name"
                @input="changeColumnName('name', $event)"
              >
              </v-text-field>
            </v-col>
            <v-col cols="2" class="mx-0 px-0 ">
              <DeleteButton
                class="deleteButton"
                service="columns"
                :item-id="column.id"
              />
            </v-col> </v-row></v-card-subtitle
        ><v-card>
          <v-card
            flat
            dark
            height="100px"
            color="green lighten-1"
            class="px-auto"
          >
            <v-card-title class="d-flex justify-center mt-n7"
              >id: {{ column.id }} --- {{ column.name }} --- rank:
              {{ column.rank }}</v-card-title
            ></v-card
          >
          <v-card-text class="mt-n2 mb-n4"></v-card-text
          ><v-icon small class="ml-4">mdi-menu</v-icon
          ><v-icon small class="ml-4">mdi-attachment</v-icon>
        </v-card>
        <p
          v-if="tasksArray(column.id).length === 0"
          height="50px"
          color="success"
          class="text-center text--disabled font-weight-thin my-auto"
          @dragover.prevent
          @drop="dropEmptyTask($event, column.id)"
        >
          drop here
        </p>

        <v-card>
          <Task :column-id="column.id" :drop-empty-task="dropEmptyTask" />
        </v-card>
        <v-card id="add-task" @dragover.stop.prevent
          ><AddTask :column-id="column.id" :displayed-tasks="displayedTasks"
        /></v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { debounce } from 'debounce'
import DeleteButton from '@/components/DeleteButton'
import Task from '@/views/TaskView'
import AddTask from '@/components/AddTask'
import app from '@/feathers-client'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Column',
  components: {
    DeleteButton,
    Task,
    AddTask
  },
  props: {},
  data() {
    return {
      boardId: this.$route.params.id,
      fromColumnRank: Number,
      toColumnRank: Number
    }
  },
  computed: {
    ...mapGetters(['columnsInBoardArray', 'tasksInColumnArray']),
    tasksArray() {
      return id => {
        if (this.tasksInColumnArray(id).length === 0) {
          return []
        }
        return this.tasksInColumnArray(id)
      }
    }
  },
  mounted() {
    this.displayedColumns(this.boardId)
  },
  methods: {
    dropEmptyTask(event, toColumnId) {
      const fromTaskIndex = parseInt(
        event.dataTransfer.getData('from-task-index')
      )
      const dragTaskList = JSON.parse(
        event.dataTransfer.getData('from-task-list')
      )
      const fromTask = dragTaskList[fromTaskIndex]
      const dropTaskList = this.tasksArray(toColumnId)
      dragTaskList.splice(fromTaskIndex, 1)[0]
      fromTask.column_id = toColumnId
      dropTaskList.push(fromTask)
      app.service('tasks').patch(fromTask.id, {
        rank: 0,
        column_id: toColumnId
      })
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
    async createColumn() {
      let rankInit = this.displayedColumns(this.boardId).length
      let newColumn = {
        name: 'new Column',
        board_id: this.boardId,
        rank: rankInit
      }
      await app.service('columns').create({
        ...newColumn
      })
    },
    displayedTasks: function(id) {
      let arrayCopy = JSON.parse(JSON.stringify(this.tasksInColumnArray(id)))
      return arrayCopy
    },
    displayedColumns: function(id) {
      let arrayCopy = JSON.parse(JSON.stringify(this.columnsInBoardArray(id)))
      return arrayCopy
    },
    ...mapMutations(['UPDATE_DISPLAY_COLUMNS']),
    changeColumnName: debounce(function(key, value) {
      let data = {}
      data[key] = value
      app.service('columns').patch({ id: this.column.id }, data)
    }, 800),
    pickColumn(event, dragColumnRank) {
      // Effects
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      // data
      //event.dataTransfer.setData('from-column-rank', fromColumnRank)
      this.fromColumnRank = dragColumnRank
    },
    enterColumn(event) {
      event.currentTarget.style.opacity = '0.3'
    },
    leaveColumn(event) {
      event.currentTarget.style.opacity = ''
    },
    over_handler(event) {
      event.currentTarget.style.opacity = '0.3'
    },
    dropColumn(event, dropColumnRank) {
      // Index vs Rank
      // Index : seulement quand on travail sur columnArray pour chager la place des columns.
      // Rank: propieté dans columns qui doit refleter Index.
      event.currentTarget.style.opacity = ''
      // recuperer data
      //let fromColumnRank = event.dataTransfer.getData('from-column-rank')
      this.toColumnRank = dropColumnRank
      let columnArray = this.displayedColumns(this.boardId)
      // recuperer fromColumnIndex, et l'enlever du l'array
      let fromColumn = columnArray.splice(this.fromColumnRank, 1)[0]
      // recuperer l'index tocolumn, et mettre fromColumn
      columnArray.splice(this.toColumnRank, 0, fromColumn)
      // mapper le col id avec rank = index
      let idList = columnArray.map(column => column.id)
      for (let i = 0; i < idList.length; i++) {
        app.service('columns').patch(idList[i], { rank: i })
      }
    }
  }
}
</script>

<style>
.col {
  cursor: pointer;
}
.task-over {
  background: red;
}
</style>
