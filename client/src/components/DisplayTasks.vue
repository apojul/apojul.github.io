<template>
   <v-container>
       <p>{{columnId}}</p>
   <v-card v-for="(task, property, i) in filterTaskList" :key="i">
                <v-card-title class="d-flex justify-center"> {{
                    task.title
                }}</v-card-title>
    
    <v-card-actions>
        <PatchTask :taskId="task.id" :dialog="patchTaskDisplay" @click="showPatchTask"/>
        <Delete :item-id="task.id" service="tasks" />

    </v-card-actions>
    </v-card>
   </v-container>
</template>

<script>
import PatchTask from '@/components/PatchTask'
import Delete from '@/components/Delete'


export default {
name: 'DisplayTasks',
components: {
    PatchTask,
    Delete
},
data (){
    return {
       patchTaskDisplay: false 
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
        return filteredTaskList   
    }
},
methods: {
    showPatchTask () {
        this.patchTaskDisplay = !this.patchTaskDisplay
    }
}
}
</script>

<style>

</style>