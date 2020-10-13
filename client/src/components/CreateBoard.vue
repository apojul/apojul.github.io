<template>
  <v-dialog v-model="createBoradDialog" persistent max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="indigo orange--text" dark v-bind="attrs" v-on="on">
        Create New Board
      <v-icon color="orange">
        mdi-login-variant
      </v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="400" tile>
      <v-card-title>
        <h2>Add a New Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="name" label="Name"></v-text-field>
          <v-textarea v-model="description" label="Description"></v-textarea>
          <v-spacer></v-spacer>
          <v-btn text @click.native="submitNewBoard"  class="red mx-0 mt-3"
            >Add Board</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateBoard",
  data: () => {
    return {
      name: "",
      description: "",
      createBoradDialog: false
    };
  },

  methods: {
    submitNewBoard() {
    this.$store.dispatch("CREATE_BOARD", {
        name: this.name,
        description: this.description,
        created_by: this.$store.state.activeUser.id
      });
      return this.closeDialog();
    },
    closeDialog() {
      this.createBoradDialog = false
    }
   // ça ne marche toujours pas. Le nouveau board s'affice dans une autre onlet, mais 
   // pas dans celle ou la commande a été excecutée 
  }
};

</script>
