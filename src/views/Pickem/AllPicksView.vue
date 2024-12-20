<script setup lang="ts">
import PickemLayout from './Layout.vue'
import PickemNavbar from '@/components/PickemNavbar.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import WeekDropdownComponent from '@/components/WeekDropdown.vue'
</script>

<template>
  <PickemLayout>
    <template #pickem-header>
      <WeekDropdownComponent :week="week" :weeks="weeks" @set-week="setWeek" v-if="!gamesLoading" />
    </template>
    <template #pickem-content>
      <div v-if="!gamesLoading">
        <PickemNavbar :week="week" />

        <div
          class="w-[calc(100vw-4rem)] md:w-full px-4 py-4 overflow-x-auto md:max-w-screen-md lg:max-w-none"
          v-if="!picksLoading"
        >
          <div class="flex">
            <div class="mx-1 border-2 border-gray-800 card" v-for="game in games">
              <div class="w-20 card-body">
                <img :src="`../teamLogos/${game.away_team.logo}`" class="w-full" />
                <div class="divider"></div>
                <img :src="`../teamLogos/${game.home_team.logo}`" class="w-full" />
              </div>
            </div>
          </div>
          <div class="mt-4" v-for="user_pick in user_picks">
            <div class="w-full h-10">
              <h4 class="absolute text-2xl text-center md:text-left">{{ user_pick.username }}</h4>
            </div>
            <div class="flex">
              <div
                class="mx-1 card"
                :class="{
                  'card-success':
                    game.winning_team &&
                    user_pick.picks.includes(`${game.id}-${game.winning_team.slug}`),
                  'card-error':
                    game.winning_team &&
                    !user_pick.picks.includes(`${game.id}-${game.winning_team.slug}`),
                  'border-2 border-gray-800': !game.winning_team
                }"
                v-for="game in games"
              >
                <div class="w-20 card-body">
                  <img
                    :src="`../teamLogos/${game.away_team.logo}`"
                    class="w-full"
                    v-if="user_pick.picks.includes(`${game.id}-${game.away_team.slug}`)"
                  />
                  <img
                    :src="`../teamLogos/${game.home_team.logo}`"
                    class="w-full"
                    v-if="user_pick.picks.includes(`${game.id}-${game.home_team.slug}`)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <SpinnerComponent />
        </div>

        <div v-if="games.length == 0">
          <div class="mt-6 card">
            <div class="card-body">Pick'em not yet available for week {{ week }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <SpinnerComponent />
      </div>
    </template>
  </PickemLayout>
</template>

<script lang="ts">
import type Game from '@/types/Game'
import type UserPick from '@/types/UserPick'
import type Week from '@/types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      picksLoading: true,
      gamesLoading: true,
      games: [] as Game[],
      week: '' as String,
      weeks: [] as Week[],
      user_picks: [] as UserPick[],
      error: '' as String
    }
  },
  async created() {
    let week = this.$route.params.week?.toString()

    if (week != '' && week != undefined) {
      this.week = week
    }

    this.getWeeks(week)
  },
  methods: {
    async getWeeks(week: string) {
      // get weeks data
      await axios
        .get(`/weeks/pickem-available.json`)
        .then((response) => {
          this.weeks = response.data.weeks

          if (week == '' || week == undefined) {
            week = response.data.current_week.number
            this.week = week
          }

          this.getGames(week)
          this.getPicks(week)
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve week data'
        })
    },
    async getGames(week: string) {
      // get game data
      await axios
        .get(`/pickem/${week}/week-games.json`)
        .then((response) => {
          this.games = response.data
          this.gamesLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve the games for week'
        })
    },
    async getPicks(week: string) {
      await axios
        .get(`/pickem/${week}/week-picks-all.json`)
        .then((response) => {
          this.user_picks = response.data.user_picks
          this.picksLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve picks for this week'
        })
    },
    async setWeek(number: string) {
      this.gamesLoading = true

      // update data
      this.week = number
      this.getWeeks(number)

      // update url
      this.$router.push({
        name: 'cfb_pickem_all_picks',
        params: {
          week: number
        }
      })
    }
  }
}
</script>
