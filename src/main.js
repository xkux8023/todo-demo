import Vue from 'vue'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router/index.js'

Vue.prototype.$http = Axios

Vue.config.productionTip = false

Vue.use(ElementUI) // Vue全局使用


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
