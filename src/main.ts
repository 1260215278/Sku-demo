import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import MyMessage from './components/message.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyMessage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
