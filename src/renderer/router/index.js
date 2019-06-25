import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/renderer/components/LandingPage/LandingPage'
import Supported from '@/renderer/components/Menu/SupportedSnaps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/supported',
      name: 'supported-snaps',
      component: Supported
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
