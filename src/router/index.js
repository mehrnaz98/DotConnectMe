import { createRouter, createWebHistory } from 'vue-router'
import CareerFilterPage from '../pages/CareerFilterPage.vue'
import IkigaiPage from '../pages/IkigaiPage.vue'

const routes = [
  { path: '/', redirect: '/career-filter' },
  { path: '/career-filter', component: CareerFilterPage },
  { path: '/ikigai', component: IkigaiPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
