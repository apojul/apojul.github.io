
<template>
  <div>
    <v-card>
      <v-card-title>
        <h2>Add a New Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="name" label="Name" ></v-text-field>
          <v-text-field v-model="created_by" label="Created By" ></v-text-field>
          <v-textarea v-model="description" label="Description" ></v-textarea>
          <v-spacer></v-spacer>
          <v-btn text @click="submitNewBoard" class="red mx-0 mt-3">Add Board</v-btn>
          
        </v-form>
      </v-card-text>
    </v-card>
    <span> name : {{this.$store.state.newBoard.name}} , description : {{this.$store.state.newBoard.description}}, created by {{this.$store.state.newBoard.created_by}} </span>
    </div>
</template>

<script>

export default {
  name: "CreateBoard",
  data: () => {
    return {
    name: "",
    description: "",
    created_by : 0
    }
  },

  
  methods: { //TODO method + @click = click on button = call method; 
              // method must change the value of .store...name and .store...des...
              //then the compounded function will dispatch an action to send the info to the db
     submitNewBoard() {
       console.log("SNBname, ", this.name, " SNBdescriptop, ", this.description, " SNBcreated by, ", this.created_by)
       this.$store.commit("INITIALIZE_NEW_BOARD", {name:this.name, description:this.description, created_by:this.created_by})
       this.$store.dispatch("CREATE_BOARD")
    }
  }
}
  // computed: {
  //   createBoard () {
  //     return 
  //       this.$store.state.newBoard.name = this.data.name
  //       this.$store.state.newBoard.description = this.data.description
  //       console.log("store name : ", this.$store.state.newBoard.name, "store description : ", this.$store.state.newBoard.description = this.description)
  //    //   this.$store.dispatch("FETCH_BOARD_LIST")
  //    //   return []
   
   // }
  // },

</script>

 

