import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
<<<<<<< HEAD
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'

<<<<<<< HEAD

Vue.config.productionTip = false;
=======
Vue.use(Vuelidate)

Vue.config.productionTip = false
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d
=======
import vuetify from './plugins/vuetify'
import app from './feathers-client'

Vue.config.productionTip = false
>>>>>>> origin/pascal-dd--

new Vue({
  router,
  store,
  vuetify,
<<<<<<< HEAD

=======
  app,
>>>>>>> origin/pascal-dd--
  render: h => h(App)
}).$mount('#app')
