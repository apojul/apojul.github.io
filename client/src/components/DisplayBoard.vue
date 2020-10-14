<template>
    <div>
        <p>there no info yet</p>
        <p>{{Object.values(this.$store.state.boards).find(board => board.id)
            }}</p>
    </div>
</template>
<script>
// TODO import lists to store in the same way as boards
// TODO import tasks
// TODO all tasks belong to a list, all lists to a board, all boards are created by a user
/*
this element will display a series of lists (v-cards) organised in a grid
each card will contain at least one task.
The currend board will be chosen form a list of boards in the navigation drawer

This component must have access to:
  - currentBoard, lists and tasks from state
  - lists and tasks need to be filtered to get just the relevant ones
It is called from BoardsNavDrawer in NavBAr:
  - router TODO see how this works
  - route /boards/board.id
  - access to /boards must be secure
This component needs to :
  - v.0 piping
    - Display list objects.name as text 
    - Display taks objects.name associated to their lists
  - v.1 visual elements
    - Display lists in separate collums
    - Display tasks in separate rows inside each list
  - v.2 CRUD
    - add patch functionality to lists
    - add patch functionality to tasks
  - v.3 reactivity
    - tasks can be moved from one list to another by drag and drop
    - lists can change places in the collumn grid while mantaining their integrity
*/
export default {
    
}
</script>