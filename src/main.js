// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import validator from '@/util/validator.js'
import '@/util/filters.js'
import toast from '@/common/toast/toast.js'
// w
import '@/stylus/main.styl' // 全局样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(validator)
Vue.use(toast)
Vue.use(ElementUI)


sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App),
  components: { App }
}).$mount('#app')
