<script setup lang="ts">
import AlertComponent from '@/components/Alert.vue'
import PickemLayout from './Layout.vue'
import PickemComponent from '@/components/Pickem.vue'
import PickemLockedComponent from '@/components/PickemLocked.vue'
import PickemCompleteComponent from '@/components/PickemComplete.vue'
import PickemNavbar from '@/components/PickemNavbar.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import WeekDropdownComponent from '@/components/WeekDropdown.vue'
</script>

<template>
  <PickemLayout>
    <template #pickem-header>
      <WeekDropdownComponent :week="week" :weeks="weeks" @set-week="setWeek" v-if="!loading" />
    </template>
    <template #pickem-content>
      <div v-if="!loading">
        <PickemNavbar :week="week" />

        <div v-if="error != ''" class="mb-4">
          <AlertComponent color="error" :message="`${error}`" />
        </div>

        <h3 class="mt-4 text-3xl text-center" v-if="show_time">
          {{ new Date(now).toLocaleString() }}
        </h3>
        <div v-for="game in games">
          <PickemComponent
            :game="game"
            :away-team-picked="isTeamPicked(game, game.away_team)"
            :home-team-picked="isTeamPicked(game, game.home_team)"
            @home-team-picked="pickWinner(game, game.home_team)"
            @away-team-picked="pickWinner(game, game.away_team)"
            v-if="canPick(game)"
          />
          <PickemLockedComponent
            :game="game"
            :away-team-picked="isTeamPicked(game, game.away_team)"
            :home-team-picked="isTeamPicked(game, game.home_team)"
            v-if="!canPick(game) && game.winning_team == null"
          />
          <PickemCompleteComponent
            :game="game"
            :away-team-picked="isTeamPicked(game, game.away_team)"
            :home-team-picked="isTeamPicked(game, game.home_team)"
            v-if="!canPick(game) && game.winning_team != null"
          />
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
      show_time: false as Boolean,
      now: new Date()
    }
  },
  async created() {
    let week = this.$route.params.week?.toString()

    if (week != '' && week != undefined) {
      this.week = week
    }

    this.getWeeks(week)
    this.showTime()
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
          // convert array string to array
          var picks = response.data.picks
            .replaceAll('"', '')
            .replace('[', '')
            .replace(']', '')
            .split(',')
          this.picks = picks
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
          // convert array string to array
          var picks = response.data.picks
            .replaceAll('"', '')
            .replace('[', '')
            .replace(']', '')
            .split(',')
          this.picks = picks
          this.error = ''
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.error = error.response.data.error
        })
    },
    async showTime() {
      await axios
        .get('/pickem/show-time')
        .then((response) => {
          this.show_time = response.data
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.error = error.response.data.error
        })
    },
    isTeamPicked(game: Game, team: Team): boolean {
      var teamPicked = false

      this.picks.forEach((gameSlug) => {
        // gameSlug looks like this: 123-clemson
        gameSlug = gameSlug.split('-')
        var gameId = parseInt(gameSlug[0])
        var teamSlug = gameSlug[1]

        if (gameId == game.id && teamSlug == team.slug) {
          teamPicked = true
        }
      })

      return teamPicked
    },
    canPick(game: Game): boolean {
      var gameTime = new Date(game.datetime).toLocaleString('en-us', {
        timeZone: 'America/New_York'
      })
      var currentTime = this.now.toLocaleString('en-us', { timeZone: 'America/New_York' })

      return new Date(gameTime) > new Date(currentTime)
    }
  }
}
</script>
