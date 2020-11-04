import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import app from './feathers-client'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  app,
  render: h => h(App)
}).$mount('#app')
