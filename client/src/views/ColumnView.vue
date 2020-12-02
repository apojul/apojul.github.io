<template>
  <v-row
    ><v-col
      v-for="(column, index) in columnArray(boardId)"
      :key="index"
      cols="2"
      class="column"
      draggable
      max-height="80%vh"
      @dragstart.self="pickColumn($event, columnArray(boardId), index)"
      @dragleave.stop.prevent="leaveColumn($event)"
      @dragover.stop.prevent="overColumn($event)"
      @drop.prevent.stop="dropColumn($event, index)"
    >
      <v-card flat class="column mx-auto" color="grey lighten-4">
        <v-card-subtitle class="py-1"
          ><v-row dense>
            <v-col cols="10">
              <v-text-field
                solo
                flat
                dense
                class="ms-8 mt-6"
                :value="column.name"
                @input="patchColumn(column.id, 'name', $event)"
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
              >{{ column.name }} - id:{{ column.id }}</v-card-title
            ></v-card
          >
          <v-card-text class="mt-n2 mb-n4"></v-card-text
          ><v-icon small class="ml-4">mdi-menu</v-icon
          ><v-icon small class="ml-4">mdi-attachment</v-icon>
        </v-card>
        <v-card class="flex-col overflow-y">
          <Task :column-id="column.id" />
        </v-card>
      </v-card>
    </v-col>
    <v-btn dark large icon @click="createColumn">
      <v-icon>mdi-playlist-plus</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import { debounce } from 'debounce'
import DeleteButton from '@/components/DeleteButton'
import Task from '@/views/TaskView'
import app from '@/feathers-client'
import { mapGetters } from 'vuex'

export default {
  name: 'Column',
  components: {
    DeleteButton,
    Task
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
    ...mapGetters(['columnsInBoardArray']),
    columnArray() {
      return id => {
        return this.columnsInBoardArray(id)
      }
    }
  },
  methods: {
    // drag and drop
    // pick events
    pickColumn(event, columnList, fromColumnIndex) {
      console.log(document.getElementById('board').offsetHeight)
      // Effects
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      // data
      event.dataTransfer.setData('column-list', JSON.stringify(columnList))
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
      event.dataTransfer.setData('type', 'column')
    },

    dropColumn(event, toColumnIndex) {
      event.currentTarget.style.opacity = ''
      const type = event.dataTransfer.getData('type')
      if (type != 'column') {
        return
      }
      // Index : seulement quand on travail sur columnArray pour chager la place des columns.
      // recuperer data
      // recuperer fromColumnIndex, et l'enlever du l'array
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')

      const columnList = JSON.parse(event.dataTransfer.getData('column-list'))
      let fromColumn = columnList.splice(fromColumnIndex, 1)[0]
      // recuperer l'index tocolumn, et mettre fromColumn
      columnList.splice(toColumnIndex, 0, fromColumn)
      // mapper le col id avec rank = index
      let idList = columnList.map(column => column.id)
      for (let i = 0; i < idList.length; i++) {
        app.service('columns').patch(idList[i], { rank: i })
      }
    },
    // crud events
    async createColumn() {
      let rankInit = this.columnArray(this.boardId).length
      let newColumn = {
        name: 'new Column',
        board_id: this.boardId,
        rank: rankInit
      }
      await app.service('columns').create({
        ...newColumn
      })
    },
    patchColumn: debounce(function(id, key, value) {
      let data = {}
      data[key] = value
      app.service('columns').patch({ id: id }, data)
    }, 800),

    enterColumn(event) {
      event.currentTarget.style.opacity = '0.3'
    },
    leaveColumn(event) {
      event.currentTarget.style.opacity = ''
    },
    overColumn(event) {
      event.currentTarget.style.opacity = '0.3'
    }
  }
}
</script>

<style>
.column {
  border: 5px solid blue;
}
.col {
  cursor: pointer;
}
.task-over {
  background: red;
}
</style>
