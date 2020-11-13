<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab icon x-small color="primary" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ activeColumn['name'] }}</span>
        </v-card-title>

        <v-form>
          <v-card-text>
            <v-text-field
              label="Name*"
              :value="activeColumn['name']"
              @input="sendChanges('name', $event)"
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
  name: 'PatchColumn',
  props: {
    columnId: {
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
    activeColumn() {
      return Object.values(this.$store.state.columns).find(
        column => column.id === this.columnId
      )
    }
  },
  methods: {
    // TODO changer @input="sendChanges('name', $event)"  et voir la doc de Vuetify pour comment c'est fait pour du vrai
    sendChanges(key, value) {
      const data = {}
      data[key] = value
      app.service('columns').patch({ id: this.columnId }, data)
    }
  }
}
</script>

<style></style>
