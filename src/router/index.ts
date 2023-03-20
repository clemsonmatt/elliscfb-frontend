import { createRouter, createWebHistory } from 'vue-router'
import Pickem from '../views/PickemView.vue'
import Teams from '../views/TeamsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pickem',
      component: Pickem
    },
    {
      path: '/teams',
      name: 'teams',
      component: Teams
    }
  ]
})

export default router
