import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import CareerFilterPage from '../pages/CareerFilterPage.vue'
import IkigaiPage from '../pages/IkigaiPage.vue'
import CommunityView from '../pages/CommunityView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/career-filter', name: 'CareerFilter', component: CareerFilterPage },
  { path: '/ikigai', name: 'Ikigai', component: IkigaiPage },
  {
    path: '/community',
    name: 'community',
    component: CommunityView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
