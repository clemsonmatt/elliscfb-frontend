import { createRouter, createWebHistory } from 'vue-router'
import Pickem from '@/views/PickemView.vue'
import Teams from '@/views/TeamsView.vue'
import Team from '@/views/TeamView.vue'
import TeamGames from '@/views/TeamGamesView.vue'
import Setting from '@/views/SettingsView.vue'

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
      path: '/teams/:slug',
      name: 'cfb_team',
      component: Team
    },
    {
      path: '/teams/:slug/games',
      name: 'cfb_team_games',
      component: TeamGames
    },
    {
      path: '/settings',
      name: 'cfb_settings',
      component: Setting
    }
  ]
})

export default router
