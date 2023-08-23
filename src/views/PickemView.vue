<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import GameComponent from '@/components/Game.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #default>
      <div class="grid gap-4 lg:grid-cols-3" v-if="!loading">
        <div>
          <div class="card">
            <div class="card-title">Stats</div>
            <div class="card-body">
              <div>content here</div>
            </div>
          </div>
          <div class="mt-6 card">
            <div class="card-title">Leaderboard</div>
            <div class="card-body">
              <div>content here</div>
            </div>
          </div>
        </div>
        <div class="row-span-2 lg:col-span-2">
          <div class="card">
            <div class="card-title">
              Pick'em
              <a href="#" class="btn btn-primary btn-sm">Week 1</a>
            </div>
          </div>
          <div v-for="game in games">
            <div class="mt-6 card">
              <div class="card-body">
                <div class="grid items-center grid-cols-3 gap-4 justify-items-stretch">
                  <router-link
                    v-bind:to="{
                      name: 'cfb_team',
                      params: { slug: game.away_team.slug.toString() }
                    }"
                  >
                    <div class="card-link">
                      <div class="my-4 text-center card-body">
                        <img :src="`../teamLogos/${game.away_team.logo}`" class="w-24 mx-auto" />
                        <span v-if="game.away_team.slug == game.predicted_winning_team.slug">
                          {{ game.away_team.name_short }} (-{{ game.spread }})
                        </span>
                        <span v-else>{{ game.away_team.name_short }}</span>
                      </div>
                    </div>
                  </router-link>
                  <div class="text-center">
                    <div class="mb-8">
                      {{ game.location }}
                      <br />
                      {{ game.home_team.city }}, {{ game.home_team.state }}
                    </div>
                    <div class="divider">
                      <router-link
                        v-bind:to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
                        class="mt-2 btn btn-sm btn-primary"
                      >
                        Game details
                      </router-link>
                    </div>
                    <br />
                    {{
                      new Date(game.date).toLocaleDateString('en-us', {
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
                  <router-link
                    v-bind:to="{
                      name: 'cfb_team',
                      params: { slug: game.home_team.slug.toString() }
                    }"
                  >
                    <div class="card-link">
                      <div class="my-4 text-center card-body">
                        <img :src="`../teamLogos/${game.home_team.logo}`" class="w-24 mx-auto" />
                        <span v-if="game.home_team.slug == game.predicted_winning_team.slug">
                          {{ game.home_team.name_short }} (-{{ game.spread }})
                        </span>
                        <span v-else>{{ game.home_team.name_short }}</span>
                      </div>
                    </div>
                  </router-link>
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
import type Week from '@/types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      games: [] as Game[],
      week: '' as String,
      weeks: [] as Week[]
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
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getGames(week: string) {
      // get game data
      await axios
        .get(`/games/${week}/week-pickem.json`)
        .then((response) => {
          this.games = response.data
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.loading = false
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
