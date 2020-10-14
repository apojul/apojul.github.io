<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="indigo orange--text "
          dark
          v-bind="attrs"
          v-on="on"
          @click="user"
        >
          {{active_user[1]}}'s Profile
          <v-icon>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in active_user"
          :key="index"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
          <v-drawer>
          <v-list-item-btn>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="indigo orange--text"
                dark
                v-bind="attrs"
                v-on="on"
                icon 
              >
                <v-icon color="grey lighten-1">mdi-lead-pencil</v-icon>
              </v-btn>
            </template>
            
            </v-list-item-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    
</template>

<script>
export default {
  name: "userProfile",

  computed : {
    active_user () {
      if (this.$store.state.activeUser === undefined) {
//        this.$store.dispatch("FETCH_BOARD_LIST");
        return [];
      } else {
      return Object.values(this.$store.state.activeUser)//transformer en liste
    }
  },
  },
  methods:{
    user () { 
       return console.log("current user : ", this.active_user )
    }
  }

}
</script>