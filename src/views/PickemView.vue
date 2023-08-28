<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import AlertComponent from '@/components/Alert.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import PickemComponent from '@/components/Pickem.vue'
import PickemLockedComponent from '@/components/PickemLocked.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #header-action>
      <a href="#" class="btn btn-primary btn-sm">Week 1</a>
    </template>
    <template #default>
      <div class="grid gap-4 lg:grid-cols-3" v-if="!loading">
        <div>
          <div class="card">
            <div class="card-title">Stats</div>
            <div class="card-body">
              <div>Coming soon...</div>
            </div>
          </div>
          <div class="mt-6 card">
            <div class="card-title">Leaderboard</div>
            <div class="card-body">
              <div>Coming soon...</div>
            </div>
          </div>
        </div>
        <div class="row-span-2 lg:col-span-2">
          <div class="grid grid-cols-2 justify-items-stretch tabs tabs-boxed">
            <a class="tab tab-lg tab-active">My Picks</a>
            <a class="tab tab-lg">All Picks</a>
          </div>
          <div v-if="error != ''" class="mb-4">
            <AlertComponent color="error" :message="`${error}`" />
          </div>
          <div v-for="game in games">
            <PickemComponent
              :game="game"
              :away-team-picked="picks.includes(game.away_team.slug)"
              :home-team-picked="picks.includes(game.home_team.slug)"
              @home-team-picked="pickWinner(game, game.home_team)"
              @away-team-picked="pickWinner(game, game.away_team)"
              v-if="canPick(game)"
            />
            <PickemLockedComponent
              :game="game"
              :away-team-picked="picks.includes(game.away_team.slug)"
              :home-team-picked="picks.includes(game.home_team.slug)"
              @home-team-picked="pickWinner(game, game.home_team)"
              @away-team-picked="pickWinner(game, game.away_team)"
              v-if="!canPick(game) && game.winning_team == null"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <SpinnerComponent />
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import type Game from '@/types/Game'
import type Team from '@/types/Team'
import type Week from '@/types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      games: [] as Game[],
      week: '' as String,
      weeks: [] as Week[],
      picks: [] as String[],
      error: '' as String,
      now: new Date()
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
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve the games for week'
        })
    },
    async getPicks(week: string) {
      this.loading = true

      await axios
        .get(`/pickem/${week}/week-picks.json`)
        .then((response) => {
          this.picks = response.data.picks
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve your picks for this week'
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
    },
    async pickWinner(game: Game, team: Team) {
      await axios
        .post(`/pickem/game-winner`, {
          week: this.week,
          game: game.id,
          team: team.id
        })
        .then((response) => {
          this.picks = response.data.picks
          this.error = ''
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.error = error.response.data.error
        })
    },
    canPick(game: Game): boolean {
      var gameTime = new Date(game.datetime).toLocaleString('en-us', {
        timeZone: 'America/New_York'
      })
      var currentTime = this.now.toLocaleString('en-us', { timeZone: 'America/New_York' })

      return gameTime > currentTime
    }
  }
}
</script>
