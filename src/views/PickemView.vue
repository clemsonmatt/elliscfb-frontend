<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import AlertComponent from '@/components/Alert.vue'
import SpinnerComponent from '@/components/Spinner.vue'
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
            <div class="mt-6 card">
              <div class="card-body">
                <div class="grid items-center grid-cols-3 gap-4 justify-items-stretch">
                  <div class="card-link" @click="pickWinner(game, game.away_team)">
                    <div class="items-center text-center card-body">
                      <img :src="`../teamLogos/${game.away_team.logo}`" class="w-24" />
                      <span v-if="game.away_team.slug == game.predicted_winning_team.slug">
                        {{ game.away_team.name_short }} (-{{ game.spread }})
                      </span>
                      <span v-else>{{ game.away_team.name_short }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 mt-2 rounded-full"
                        :class="{
                          'text-white bg-primary': picks.includes(game.away_team.slug),
                          ' text-base-100 bg-base-300': !picks.includes(game.away_team.slug)
                        }"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="text-center">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 mx-auto mb-4 text-primary"
                        v-if="!canPick(game)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 mx-auto mb-4 text-primary"
                        v-if="canPick(game)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      {{ game.location }}
                      <br />
                      {{ game.home_team.city }}, {{ game.home_team.state }}
                    </div>
                    <div class="w-full my-5">
                      <div class="divider">
                        <router-link
                          v-bind:to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
                          class="btn btn-sm btn-primary"
                        >
                          Game details
                        </router-link>
                      </div>
                    </div>
                    <div>
                      {{
                        new Date(game.datetime).toLocaleDateString('en-us', {
                          month: 'short',
                          day: '2-digit',
                          weekday: 'long'
                        })
                      }}
                      <br />
                      {{ game.time }}
                      <div class="ml-2 badge badge-default badge-outline" v-if="game.network">
                        {{ game.network }}
                      </div>
                    </div>
                  </div>
                  <div class="card-link" @click="pickWinner(game, game.home_team)">
                    <div class="items-center text-center card-body">
                      <img :src="`../teamLogos/${game.home_team.logo}`" class="w-24" />
                      <span v-if="game.home_team.slug == game.predicted_winning_team.slug">
                        {{ game.home_team.name_short }} (-{{ game.spread }})
                      </span>
                      <span v-else>{{ game.home_team.name_short }}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 mt-2 rounded-full"
                        :class="{
                          'text-white bg-primary': picks.includes(game.home_team.slug),
                          ' text-base-100 bg-base-300': !picks.includes(game.home_team.slug)
                        }"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
