<script setup lang="ts">
import PickemLayout from './Layout.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <PickemLayout>
    <template #pickem-content>
      <div v-if="!gamesLoading">
        <div class="grid hidden grid-cols-10 gap-1 my-6 md:inline-flex justify-items-stretch">
          <div class="card" v-for="game in games">
            <div class="card-body">
              <img :src="`../teamLogos/${game.away_team.logo}`" class="w-full" />
              <div class="divider"></div>
              <img :src="`../teamLogos/${game.home_team.logo}`" class="w-full" />
            </div>
          </div>
        </div>
        <div v-for="user_pick in user_picks" v-if="!picksLoading">
          <div class="divider"></div>
          <h4 class="text-2xl text-center md:text-left">{{ user_pick.username }}</h4>
          <div class="grid grid-cols-5 gap-1 mb-6 md:grid-cols-10 justify-items-stretch">
            <div
              class="my-1 card"
              :class="{
                'card-success':
                  game.winning_team && user_pick.picks.includes(game.winning_team.slug),
                'card-error': game.winning_team && !user_pick.picks.includes(game.winning_team.slug)
              }"
              v-for="game in games"
            >
              <div class="card-body">
                <img
                  :src="`../teamLogos/${game.away_team.logo}`"
                  class="w-full"
                  v-if="user_pick.picks.includes(game.away_team.slug)"
                />
                <img
                  :src="`../teamLogos/${game.home_team.logo}`"
                  class="w-full"
                  v-if="user_pick.picks.includes(game.home_team.slug)"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <SpinnerComponent />
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
        .get(`/weeks/full-season.json`)
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
      // update data
      this.week = number
      this.getWeeks(number)

      // update url
      this.$router.push({
        name: 'cfb_pickem',
        params: {
          week: number
        }
      })
    }
  }
}
</script>
