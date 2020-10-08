<template>
  <div>
    <v-card class="mx-auto" max-width="400" tile>
      <v-card-title>
        <h2>Add a New Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-textarea v-model="description" label="Description"></v-textarea>
          <v-spacer></v-spacer>
          <v-btn text @click="submitNewBoard" class="red mx-0 mt-3"
            >Add Board</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CreateBoard",
  data: () => {
    return {
      name: "",
      description: "",
      created_by: 2 // once authUser works, this should be this.$store.authUser.id
    };
  },

  methods: {
    submitNewBoard() {
    this.$store.dispatch("CREATE_BOARD", {
        name: this.name,
        description: this.description,
        created_by: this.created_by
      });
    }
  }
};

</script>
