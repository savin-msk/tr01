import Vue from 'vue'
import Router from 'vue-router'
import ServerView from '../components/ServerView.vue'
import ContainerView from '../components/ContainerView.vue'

// const routes = [
//     { 
//         path: '/',
//         name: 'SV',
//         component: ServerView,
//     },
//     { 
//         path: '/home',
//         name: 'CV',
//         component: ContainerView
//     },
// ]

// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})

export default router