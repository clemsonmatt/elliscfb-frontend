import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import Login from '@/views/LoginView.vue'
import Pickem from '@/views/PickemView.vue'
import SettingsPickem from '@/views/Settings/PickemView.vue'
import SettingsGames from '@/views/Settings/GamesView.vue'
import SettingsStats from '@/views/Settings/GameStatsView.vue'
import SettingsStatsAdd from '@/views/Settings/GameStatsAddView.vue'
import Teams from '@/views/TeamsView.vue'
import Team from '@/views/TeamView.vue'
import TeamGames from '@/views/TeamGamesView.vue'
import Games from '@/views/Game/ListView.vue'
import Game from '@/views/Game/DetailView.vue'
import GameAdd from '@/views/Game/AddView.vue'
import GameEdit from '@/views/Game/EditView.vue'

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
      path: '/game/add',
      name: 'cfb_game_add',
      component: GameAdd
    },
    {
      path: '/game/:id',
      name: 'cfb_game',
      component: Game
    },
    {
      path: '/settings/pickem',
      name: 'cfb_settings_pickem',
      component: SettingsPickem,
      meta: { manageRole: true }
    },
    {
      path: '/settings/games/:week?',
      name: 'cfb_settings_games',
      component: SettingsGames,
      meta: { manageRole: true }
    },
    {
      path: '/settings/game/:id/edit',
      name: 'cfb_game_edit',
      component: GameEdit,
      meta: { manageRole: true }
    },
    {
      path: '/settings/stats/:week?',
      name: 'cfb_settings_stats',
      component: SettingsStats,
      meta: { manageRole: true }
    },
    {
      path: '/settings/stats/:id/add',
      name: 'cfb_settings_game_stat',
      component: SettingsStatsAdd,
      meta: { manageRole: true }
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
  const requiresManageRole = to.meta.manageRole
  const auth = useAuthStore()

  // make sure the user and roles are up-to-date
  auth.updateUser()

  if (authRequired && !auth.user) {
    // auth.returnUrl = to.fullPath || '/'
    return '/login'
  }

  // redirect back if user doesn't have manage role
  if (requiresManageRole && !auth.canManage) {
    return '/'
  }
})

export default router
