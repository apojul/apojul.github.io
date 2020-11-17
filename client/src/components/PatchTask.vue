<template>
  <v-dialog v-model="openDialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab icon x-small color="primary" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ activeTask['title'] }}</span>
      </v-card-title>

      <v-form>
        <v-card-text>
          <v-text-field
            label="Title*"
            :value="activeTask['title']"
            @input="sendChanges('title', $event)"
          ></v-text-field>
          <v-text-field
            label="Description*"
            :value="activeTask['description']"
            @input="sendChanges('description', $event)"
          ></v-text-field>
          <v-text-field
            label="Index"
            :value="activeTask['index']"
            @input="sendChanges('index', $event)"
          ></v-text-field>
        </v-card-text>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="openDialog = false">
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { debounce } from 'debounce'
import app from '@/feathers-client'

export default {
  name: 'PatchTask',
  props: {
    taskId: {
      type: Number,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      openDialog: this.dialog
    }
  },
  computed: {
    activeTask() {
      return Object.values(this.$store.state.tasks).find(
        task => task.id === this.taskId
      )
    }
  },
  methods: {
    sendChanges: debounce(function(key, value) {
      const data = {}
      data[key] = value
      console.log('int')
      app.service('tasks').patch({ id: this.taskId }, data)
    }, 800)
  }
}
</script>

<style></style>
