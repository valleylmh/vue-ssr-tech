import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import Toast from './components/Toast'
import Notification from './components/Notification'
import Tabs from './components/Tabs'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
// 注册全局组件
Vue.use(Notification) // 且注册了全局的方法 $notify
Vue.use(Tabs)

Vue.$toast = Vue.prototype.$toast = Toast

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
