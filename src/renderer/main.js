import Vue from 'vue'

import 'bulma-pro/bulma.sass'

import './assets/style/main.sass'
import './assets/style/animations.sass'
import './assets/fontawesome/css/fontawesome-all.css'

import App from './App'
import router from './router'
import store from './store'
import 'bulma/css/bulma.css'
import 'bulma-extensions/dist/css/bulma-extensions.min.css'
import VM from '@/main/ViewManager'
import DBManager from '@/main/DBManager'
import SnapManager from '@/main/SnapManager'
import viewEmitter from '@/main/EventManager'

const DB = new DBManager()
const snapManager = new SnapManager()

Vue.config.productionTip = false

Vue.prototype.$viewEmitter = viewEmitter
Vue.prototype.$VM = VM
Vue.prototype.$DB = DB
Vue.prototype.$SnapManager = snapManager

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
