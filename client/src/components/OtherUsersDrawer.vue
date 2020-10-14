<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      
      app
      right
      class="indigo orange--text "
    >
      <v-list-item class="px-2">
        <v-list-item-title class="orange--text" >Online</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <p>online : {{usersONlineList}}</p>
      <v-list >
        <v-list-item
          flat v-for="user in usersONlineList" 
          :key="user.id"
        >
          <v-list-item-icon>
            <v-icon class="green--text"> mdi-head-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title 
              class="orange--text"
              >{{ user}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item class="px-2">
        <v-list-item-title class="orange--text" >OffLine</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <p>offline : {{usersOFFlineList}}</p>
      <v-list >
        <v-list-item
          flat v-for="user in usersOFFLineList" 
          :key="user.id"
        >
          <v-list-item-icon>
            <v-icon class="red--text"> mdi-head-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title 
              class="orange--text"
              >{{ user.full_name }} 
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

/*this element will display a two lists of users, online and offline 
  it will take two objects from state otherUsers and otherUsersOnLine to generate the two lists
  fisrt component : it will display all the users on otherUsersOnLine.
  second component : it will display a new computed list: 
    otherUsersoffline = otherUsers - otherUsersOnLine
  
  considerations:
  - otherUsersOnLine is an object [{userObject}]
  - otherUsers is an object {userid {userObject}} dont know which is true

*/
  import app from "@/feathers-client"
  export default {
    name: "otherUsersDrawer",
    async mounted() {
    let conUser = await app.service('con_users').create({})
    console.log("conUser,", conUser)
   
  },

    data () {
      return {
        drawer: true,
        mini: true,
      }
    },
    computed: {
    usersONlineList() {
        return this.$store.state.otherUsersOnLine     
    },
    usersOFFLineList () {
        return this.$store.state.otherUsers 
    }
  }
}
</script>