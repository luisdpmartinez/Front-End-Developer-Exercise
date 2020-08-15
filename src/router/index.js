import Vue from 'vue'
import VueRouter from 'vue-router'
import Checkout from '../views/CheckoutPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Checkout',
    component: Checkout
  },
]

const router = new VueRouter({
  routes
})

export default router
