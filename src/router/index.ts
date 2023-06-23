import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/views/LoginView.vue'
import Pickem from '@/views/PickemView.vue'
import SettingsPickem from '@/views/Settings/PickemView.vue'
import SettingsGames from '@/views/Settings/GamesView.vue'
import Teams from '@/views/TeamsView.vue'
import Team from '@/views/TeamView.vue'
import TeamGames from '@/views/TeamGamesView.vue'
import Games from '@/views/GamesView.vue'
import Game from '@/views/GameView.vue'

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
      path: '/games/:week?',
      name: 'cfb_games',
      component: Games
    },
    {
      path: '/game/:id',
      name: 'cfb_game',
      component: Game
    },
    {
      path: '/settings/pickem',
      name: 'cfb_settings_pickem',
      component: SettingsPickem
    },
    {
      path: '/settings/games',
      name: 'cfb_settings_games',
      component: SettingsGames
    },
    {
      path: '/settings/game/:id/edit',
      name: 'cfb_settings_game_edit',
      component: SettingsGames
    },
    {
      path: '/login',
      name: 'cfb_login',
      component: Login
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    // auth.returnUrl = to.fullPath || '/'
    return '/login'
  }
})

export default router
