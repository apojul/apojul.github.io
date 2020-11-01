<template>
  <v-row jusstify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template #activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          Create board
        </v-btn>
      </template>
      <v-card @keypress.enter="addBoard">
        <v-card-title>
          <h2 class="headline">
            New board
          </h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-card-text>
              <v-text-field v-model="name" label="Name*" />
              <v-textarea
                v-model="description"
                label="Description"
                hint="Description text"
              />
            </v-card-text>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addBoard">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

  <!-- <div>
		<h3>Create a new board</h3>
		<form>
		<v-text-field v-model="name" label="Name"></v-text-field>
		<v-col cols="12" md="6">
			<v-textarea v-model="description" label="description"></v-textarea>
		</v-col>
		<v-btn class="mr-4" @click="addBoard">
			Add
		</v-btn>
		</form>
	</div> -->
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      created_by: this.creator,
      dialog: false,
      newBoard: null
    }
  },
  computed: {
    creator() {
      return this.$store.state.activeUser.id
    }
  },
  methods: {
    addBoard() {
      const newBoard = {
        name: this.name,
        description: this.description,
        created_by: this.creator
      }
      this.$store.dispatch('post_board', newBoard)
      this.dialog = false
    }
  }
}
</script>
