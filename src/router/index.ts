import { createRouter, createWebHistory } from 'vue-router'
import Pickem from '../views/PickemView.vue'
import Teams from '../views/TeamsView.vue'
import Team from '../views/TeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cfb_pickem',
      component: Pickem
    },
    {
      path: '/teams',
      name: 'cfb_teams',
      component: Teams
    },
    {
      path: '/teams/:nameShort',
      name: 'cfb_team',
      component: Team
    }
  ]
})

export default router
