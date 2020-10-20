<template>
  <v-row jusstify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <h2 class="headline">Board {{ this.$route.params.id }}</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-card-text>
              <v-text-field
                label="Name*"
                :value="getBoard['name']"
                @input="handleInput('name', $event)"
              ></v-text-field>
              <v-textarea
                label="Description"
                hint="Description text"
                :value="getBoard['description']"
                @input="handleInput('description', $event)"
              ></v-textarea>
              <v-text-field
                label="background"
                :value="getBoard['background']"
                @input="handleInput('background', $event)"
              ></v-text-field>
              <v-text-field
                label="Is_private*"
                :value="getBoard['is_private']"
                @input="handleInput('is_private', $event)"
              ></v-text-field>
              <v-text-field
                label="Archived"
                :value="getBoard['archived']"
                @input="handleInput('archived', $event)"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="patchBoard">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import app from '@/feathers-client'

export default {
  props: {},
  data() {
    return {
      dialog: false,
      name: '',
      description: '',
      background: '',
      is_private: '',
      archived: ''
    }
  },
  computed: {
    getBoard() {
      return this.$store.state.boards[this.$route.params.id]
    }
  },
  methods: {
    patchBoard(field, value) {
      const patchBoard = {
        [field]: value
      }
      /* this.$store.dispatch('putBoard', patchBoard) */
      this.dialog = false
      console.log(patchBoard)
    },
    updateBoard(field, value) {
      this.$store.commit('UPDATE_BOARD', { field: value })
    },
    handleInput(field, value) {
      const data = {}
      data[field] = value
      app.service('boards').patch(this.$route.params.id, data)
      console.log('field : ', field)
      console.log('value : ', value)
    }
  }
}
</script>
