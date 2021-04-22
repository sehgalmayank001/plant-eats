import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import list from '../views/list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'shortenUrl',
    component: Home
  },
  {
    path: '/list',
    name: 'urlList',
    component: list
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  }
]

const router = new VueRouter({
  routes
})

export default router
