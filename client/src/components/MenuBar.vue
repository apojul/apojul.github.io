<template>
  <div class="menubar">
    <div class="btn-group" role="group" aria-label="Menu bar">
      <router-link to="/boards" :class="buttonClass('/boards')"
        >Board
        </router-link>
      <router-link to="/backlog" :class="buttonClass('/backlog')"
        >Backlog
        </router-link>
              <router-link to="/login" :class="buttonClass('/login')"
        >Log In
        </router-link>
              
    </div>
            <v-btn text @click="logOut" class="red mx-0 mt-3 success">logout</v-btn>   
   </div>
    
</template>

<script>
export default {
  name: "MenuBar",
  methods: {
    buttonClass(path) {
      return {
        btn: true,
        "btn-primary": this.$route.path === path,
        "btn-secondary": this.$route.path !== path
      };
    }
  },
  computed: {
    logOut () {
      return this.$store.submit("LOG_OUT")
    }
  }
};
</script>

<style>
.menubar {
  margin-bottom: 16px;
}
</style>
