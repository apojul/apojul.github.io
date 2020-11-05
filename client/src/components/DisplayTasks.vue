<template>
   <v-container>
       <p>{{columnId}}</p>
   <v-card v-for="(task, property, i) in filterTaskList" :key="i">
                <v-card-title class="d-flex justify-center"> {{
                    task.title
                }}</v-card-title>
    </v-card>
   </v-container>
</template>

<script>
export default {
name: 'DisplayTasks',
data (){
    return {
 //      columnId: 2 
    }  
},
props: {
    columnId : {
        type: Number,
        required: true
    }
},
computed: {
     getTaskList() {
      if (this.$store.state.tasks === undefined) {
        this.$store.dispatch('fetch_task_list')
        return []
      }
      return this.$store.state.tasks
    },
    filterTaskList() {
      let filteredTaskList = Object.values(this.getTaskList).filter(
        task => task.column_id === this.columnId)
        console.log("filteredTaskList", filteredTaskList)
        return filteredTaskList   
    }
}
}
</script>

<style>

</style>