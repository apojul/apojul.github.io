<template>
  <v-container
    ><v-card
      v-for="task in tasksInColumnArray(columnId)"
      :key="task.rank"
      class="d-flex"
      draggable
      @drop.stop="dropTask($event, task.rank, columnId)"
      @dragstart.stop="pickTask($event, task.rank)"
      @dragenter.stop.prevent
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
                :displayed-tasks="displayedTasks"
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
      fromTaskRank: Number,
      fromColumnId: Number,
      toTaskRank: Number,
      toColumnId: Number,
      fromTask: Object,
      fromTaskArray: {}
    }
  },
  computed: {
    ...mapGetters(['columnsInBoardArray', 'tasksInColumnArray'])
  },
  mounted() {
    this.displayedTasks(this.columnId)
  },
  methods: {
    displayedTasks: function(id) {
      let arrayCopy = JSON.parse(JSON.stringify(this.tasksInColumnArray(id)))
      return arrayCopy
    },
    patchTask: debounce(function(id, key, value) {
      const data = {}
      data[key] = value
      console.log('ext')
      app.service('tasks').patch({ id: id }, data)
    }, 800),
    showPatchTask() {
      this.patchTaskDisplay = !this.patchTaskDisplay
    },
    pickTask(event, dragTaskRank) {
      // effects
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      // data
      this.fromTaskRank = dragTaskRank
      console.log('fromTaskRank', this.fromTaskRank)

      this.fromTaskArray = this.displayedTasks(this.columnId)
      this.fromTask = this.fromTaskArray.splice(this.fromTaskRank, 1)[0]
      this.fromColumnId = this.fromTask.column_id
      console.log('fromTask', this.fromTask)
      let fromTaskArrayRankMap = this.fromTaskArray.map(task => [
        task.id,
        task.rank
      ])
      console.log('fromTaskArrayRankMap', fromTaskArrayRankMap)

      console.log(event, dragTaskRank, this.fromTask.column_id)
    },
    dropTask(event, dropTaskRank, toColumnId) {
      this.toColumnId = toColumnId
      let toTaskArray = this.displayedTasks(toColumnId)
      console.log('drop A this.fromTask', this.fromTask)
      if (this.fromColumnId === toColumnId) {
        this.fromTaskArray.splice(dropTaskRank, 0, this.fromTask)
        let fromTaskArrayRankMap = this.fromTaskArray.map(task => [
          task.id,
          task.rank
        ])
        console.log('drop fromTaskArrayRankMap', fromTaskArrayRankMap)
      } else {
        toTaskArray.splice(dropTaskRank, 0, this.fromTask)
        let toTaskArrayRankMap = toTaskArray.map(task => [
          task.id,
          task.rank,
          task.column_id
        ])
        console.log('drop fromTask', this.fromTask)
        console.log('drop toTaskArrayRankMap', toTaskArrayRankMap)
      }
      // il faut savoir si on est on dans la meme colone ou pas
      // // recuperer fromColumnIndex, et l'enlever du l'array
      // let fromColumn = columnArray.splice(this.fromColumnRank, 1)[0]
      // // recuperer l'index tocolumn, et mettre fromColumn
      // columnArray.splice(this.toColumnRank, 0, fromColumn)
      // // mapper le col id avec rank = index
      // let idList = columnArray.map(column => column.id)
      // for (let i = 0; i < idList.length; i++) {
      //   app.service('columns').patch(idList[i], { rank: i })
      // }
      console.log(
        'event',
        event,
        'dropTaskRank',
        dropTaskRank,
        'toColumnId',
        toColumnId
      )
    }
  }
}
</script>

<style></style>
