import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import Vuelidate from 'vuelidate'

<<<<<<< HEAD

Vue.config.productionTip = false;
=======
Vue.use(Vuelidate)

Vue.config.productionTip = false
>>>>>>> b34a64c0602d118843a391333bf55112e6fb928d

new Vue({
  router,
  store,
  vuetify,

  render: h => h(App)
}).$mount('#app')
