<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab icon x-small color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-magnify</v-icon>
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
  </v-row>
</template>

<script>
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
  /*  props are read only
    the value of dialog is determined by the parent component
    columnId is used to compute activeColumn
    
*/
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
    sendChanges(key, value) {
      const data = {}
      data[key] = value
      app.service('tasks').patch({ id: this.taskId }, data)
    }
  }
}
</script>

<style></style>
