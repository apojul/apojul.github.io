<template>
  <v-row
    ><v-col
      v-for="column in columnsInBoardArray(boardId)"
      :key="column.rank"
      cols="2"
      draggable
      @dragover.prevent="over_handler($event)"
      @dragleave.prevent="leaveColumn($event)"
      @dragstart.self="pickColumn($event, column.rank, column.id)"
      @dragend="dropColumn($event, column.rank)"
    >
      <v-card flat class="mx-auto" color="grey lighten-4">
        <v-card-subtitle class="py-1"
          ><v-row dense>
            <v-col cols="10">
              <v-text-field
                solo
                flat
                dense
                class="ms-8 mt-6"
                :value="column.name"
                :description="column.description"
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
            <v-card-title class="d-flex justify-center mt-n7"
              >id: {{ column.id }} --- {{ column.name }}</v-card-title
            ></v-card
          >
          <v-card-text class="mt-n2 mb-n4"></v-card-text
          ><v-icon small class="ml-4">mdi-menu</v-icon
          ><v-icon small class="ml-4">mdi-attachment</v-icon>
        </v-card>
        <v-card>
          <Task :column-id="column.id" />
        </v-card>
        <v-card><AddTask :column-id="column.id"/></v-card>
      </v-card> </v-col
  ></v-row>
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
      draggingTask: undefined,
      droppingColumn: undefined
    }
  },
  computed: {
    ...mapGetters(['columnsInBoardArray', 'tasksIncolumnsArray']),
    displayedColumns: {
      get() {
        return this.columnsInBoardArray
      },
      set({ value }) {
        return this.UPDATE_DISPLAY_COLUMNS({ value })
      }
    }
  },
  methods: {
    ...mapMutations(['UPDATE_DISPLAY_COLUMNS']),
    changeColumnName: debounce(function(key, value) {
      let data = {}
      data[key] = value
      app.service('columns').patch({ id: this.column.id }, data)
    }, 800),
    pickColumn(event, fromColumnRank, fromColumnId) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('text', 'abc')
      event.dataTransfer.setData('from-column-index', fromColumnRank)
      console.log('drag fromColumnRank', fromColumnRank)
      event.dataTransfer.setData('from-column-id', fromColumnId)
      console.log('drag fromColumnId', fromColumnId)
      console.log(event)
    },
    enterColumn(event) {
      event.currentTarget.style.opacity = '0.5'
    },
    leaveColumn(event) {
      event.currentTarget.style.opacity = ''
    },
    over_handler(event) {
      event.currentTarget.style.opacity = '0.5'
    },
    dropColumn(event, toColumnRank) {
      console.log(event)
      let abc = event.dataTransfer.getData('abc')
      console.log('abc', abc)
      event.currentTarget.style.opacity = ''
      let fromColumnRank = event.dataTransfer.getData('from-column-index')
      let fromColumnId = event.dataTransfer.getData('from-column-id')
      console.log('drop fromColumnId', fromColumnId)
      console.log('drop fromColumnRank', fromColumnRank)
      console.log('drop toColumnRank', toColumnRank)
      console.log(
        'drop columnsArray before splice',
        this.columnsInBoardArray(this.$route.params.id)
      )
      const Id = this.$route.params.id
      this.UPDATE_DISPLAY_COLUMNS({ Id, fromColumnRank, toColumnRank })
      /* let arrayFinal = this.columnsInBoardArray(this.boardId)
      const columnToMove = this.columnsInBoardArray(this.boardId).splice(
        0,
        1
      )[0]
      console.log('columnToMove ', columnToMove.id)
      console.log('arrayFinal', arrayFinal)
      arrayFinal.splice(1, 0, columnToMove)
      console.log('columnMoved)', arrayFinal.splice(1, 0, columnToMove)) */
      //console.log('columnsArray after splice', this.columnsArray)

      //this.columnsArray.map(column => {console.log('faux.app.service', column.id, 'rank', this.indexOf(column))})
    }
  }
}
</script>

<style>
.col {
  cursor: pointer;
}
</style>
