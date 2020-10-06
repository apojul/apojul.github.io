<<<<<<< HEAD

<template>
  <div>
    <v-card  class="mx-auto"
    max-width="400"
    tile>
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
    </div>
</template>

<script>
// import app from "../feathers-client"
// let test = app.service("boards").on("created", board => {
//    return board 
//})
export default {
  name: "CreateBoard",
  data: () => {
    return {
    name: "",
    description: "",
    created_by : 0,
    //test: test()
    } 
    
  },

  
  methods: { 
     submitNewBoard() {
    //   console.log("SNBname, ", this.name, " SNBdescriptop, ", this.description, " SNBcreated by, ", this.created_by)
  //   let payload = {name:this.name, description:this.description, created_by:this.created_by}
  //  console.log( "   p ", payload)

       this.$store.dispatch("CREATE_BOARD", {name:this.name, description:this.description, created_by:this.created_by})
    }
  }
}
//   computed: {
 
// }

</script>

 

=======
<template>
  <div>
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
    <span v-if="getNewBoard">
      {{ getNewBoard }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: '',
      description: '',
      created_by: 2,
      newBoard: null
    }
  },
  methods: {
    addBoard() {
      const newBoard = {
        name: this.name,
        description: this.description,
        created_by: this.created_by
      }
      this.$store.dispatch('postBoard', newBoard)
      return []
    }
  },
  computed: {
    ...mapGetters(['getNewBoard'])
  }
}
</script>
n
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d
