<template>
  <v-card flat class="mx-auto" color="grey lighten-4">
    <v-card-subtitle class="py-1"
      >{{ thisColumn.name }}
      <DeleteButton
        service="columns"
        :item-id="columnId"
        clipped-right
      /> </v-card-subtitle
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
    <Task :column-id="columnId" />
    <AddTask :column-id="columnId" />
  </v-card>
</template>

<script>
import DeleteButton from '@/components/DeleteButton'
import Task from '@/views/TaskView'
import AddTask from '@/components/AddTask'

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
    }
  },
  computed: {
    thisColumn() {
      return this.$store.state.columns[this.columnId]
    }
  }
}
</script>

<style></style>
