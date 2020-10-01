
<template>
    <v-card>
      <v-card-title>
        <h2>Add a New Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="name" label="Name" ></v-text-field>
          <v-textarea v-model="description" label="Description" ></v-textarea>
          <v-spacer></v-spacer>
          <v-btn text @click="submit" class="red mx-0 mt-3">Add Board</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
</template>

<script>

export default {
  name: "CreateBoard",
  data() {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        console.log(this.name, this.description)
      }
    }
  },
  computed: {
   
  }
}
</script>

 

