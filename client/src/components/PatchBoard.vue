<template>
  <v-dialog v-model="boardDialog" persistent width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab icon x-small color="primary" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="headline">Board {{ $route.params.id }}</h2>
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
        <v-btn
          color="blue darken-1"
          text
          :to="{ name: 'user_id' }"
          @click="boardDialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { debounce } from 'debounce'
import app from '@/feathers-client'

export default {
  name: 'PatchBoard',
  props: {
    boardId: {
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
      boardDialog: this.dialog,
      name: '',
      description: '',
      background: '',
      is_private: '',
      archived: ''
    }
  },
  computed: {
    getBoard() {
      return this.$store.state.boards[this.boardId]
    }
  },
  methods: {
    handleInput: debounce(function(field, value) {
      const data = {}
      data[field] = value
      console.log('int')
      app.service('boards').patch({ id: this.boardId }, data)
    }, 800)
  }
}
</script>

<style></style>
