import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Servicing from '@/components/Servicing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '/servicing',
          component: Servicing
        }
      ]
    }
  ]
})
