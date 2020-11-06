<template>
  <v-row justify="center">
    <v-dialog
      v-model="openDialog"
      width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          icon
          x-small
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-magnify</v-icon>
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
          <v-btn
            color="green darken-1"
            text
            @click="openDialog = false"
          >
            Done
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
name: 'PatchColumn',
/*  props are read only
    the value of dialog is determined by the parent component
    columnId is used to compute activeColumn
    
*/
data () {
  return {
    openDialog: this.dialog
  }
},
props: {
    columnId : {
        type: Number,
        required: true
    },
    dialog : {
        type: Boolean,
        required: true,
        default: false
    }
},
computed: {
    activeColumn () {
        let column = Object.values(this.$store.state.columns).filter(
        column => column.id === this.columnId)
        return column
    }
},
methods: {
    sendChanges(field, value) {

      const data = {}
      data[field] = value
      this.$store.dispatch('patch_column', { id: this.columnId, data })
      console.log(
        'column payload id :',
        this.columnId,
        'data: ',
        data
      )
    }
}
}
</script>

<style>

</style>