<template>
   <v-btn small depressed text color="grey lighten-1" @click="addTask"
                ><v-icon dark small>mdi-plus</v-icon>Add another task
    </v-btn>
</template>

<script>
export default {
name: 'AddTask',
props: {
    columnId : {
        type: Number,
        required: true
    }
},
methods: {
    addTask(){
        this.$store.dispatch('create_task', {
            column_id: this.columnId, 
            title: "New Task",
            user_id: this.$store.state.activeUser.id
            })
    }
}
}
</script>

<style>

</style>