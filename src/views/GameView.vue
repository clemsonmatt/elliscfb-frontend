<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import type Game from '@/types/Game'
</script>

<template>
  <BaseLayout>
    <template #header>
      <div class="flex justify-between" v-if="!loading">
        <div>
          <router-link :to="{ name: 'cfb_team', params: { slug: game.home_team.slug.toString() } }">
            {{ game.home_team.name }}
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'cfb_team', params: { slug: game.away_team.slug.toString() } }">
            {{ game.away_team.name }}
          </router-link>
        </div>
      </div>
    </template>

    <template #default>
      <div class="grid gap-4 xl:grid-cols-3">
        <div class="card">
          <h2 class="card-title">Details</h2>
          <div class="text-center card-body">
            <h4 class="pb-2 text-lg italic border-b border-base-100">{{ game.location }}</h4>
            <h4 class="text-lg">
              {{
                new Date(game.date).toLocaleDateString('en-us', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              }}
            </h4>
            <h4 class="pb-2 text-lg">
              {{ game.time }}
              <div class="ml-2 badge badge-primary">{{ game.network ?? 'TBD' }}</div>
            </h4>
          </div>
        </div>
        <div class="col-span-2 row-span-2">
          <div class="mb-6 card card-compact" v-if="game.winning_team">
            <h2 class="card-title">Game Statistics</h2>
            <div class="card-body">
              <table class="table table-compact">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th class="text-center">{{ game.home_team.name_short }}</th>
                    <th class="text-center">{{ game.away_team.name_short }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colspan="3" class="bg-base-300">Points</th>
                  </tr>
                  <tr>
                    <th>Final</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>1st Quarter</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>2nd Quarter</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>3rd Quarter</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>4th Quarter</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card card-compact">
            <div class="card-body" v-if="!loading">
              <h2 class="card-title">Team Comparison</h2>
              <table class="table table-compact">
                <thead>
                  <tr>
                    <th>Stat (Avg per game)</th>
                    <th class="text-center">{{ game.home_team.name_short }}</th>
                    <th class="text-center">{{ game.away_team.name_short }}</th>
                    <th class="text-center">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Scoring Margin</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>Total Offense</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                  <tr>
                    <th>Opponent Total Offense</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      game: {} as Game
    }
  },
  async created() {
    // get data
    let gameId = this.$route.params.id.toString()

    await axios
      .get(`games/${gameId}.json`)
      .then((response) => {
        this.game = response.data
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        this.loading = false
      })
  }
}
</script>
