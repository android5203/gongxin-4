import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// iview
import iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iview);

// router
import router from './router/index'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
