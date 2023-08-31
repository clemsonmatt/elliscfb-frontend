<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import type Game from '@/types/Game'
</script>

<template>
  <BaseLayout>
    <template #header>
      <div v-if="!loading">
        <div class="justify-between hidden md:flex">
          <div>
            <h4 class="text-lg uppercase text-base-300">Home</h4>
            <div class="flex items-center space-x-4">
              <img :src="`../teamLogos/${game.home_team.logo}`" class="w-16" />
              <router-link
                :to="{ name: 'cfb_team', params: { slug: game.home_team.slug.toString() } }"
              >
                {{ game.home_team.name }}
              </router-link>
            </div>
          </div>
          <div>
            <h4 class="text-lg text-right uppercase text-base-300">Away</h4>
            <div class="flex items-center space-x-4">
              <router-link
                :to="{ name: 'cfb_team', params: { slug: game.away_team.slug.toString() } }"
              >
                {{ game.away_team.name }}
              </router-link>
              <img :src="`../teamLogos/${game.away_team.logo}`" class="w-16" />
            </div>
          </div>
        </div>
        <div class="block md:hidden">
          <div>
            <h4 class="text-lg uppercase text-base-300">Home</h4>
            <div class="flex items-center space-x-4">
              <img :src="`../teamLogos/${game.home_team.logo}`" class="w-10" />
              <router-link
                :to="{ name: 'cfb_team', params: { slug: game.home_team.slug.toString() } }"
                class="text-2xl"
              >
                {{ game.home_team.name }}
              </router-link>
            </div>
          </div>
          <div class="divider"></div>
          <div>
            <h4 class="text-lg uppercase text-base-300">Away</h4>
            <div class="flex items-center space-x-4">
              <img :src="`../teamLogos/${game.away_team.logo}`" class="w-10" />
              <router-link
                :to="{ name: 'cfb_team', params: { slug: game.away_team.slug.toString() } }"
                class="text-2xl"
              >
                {{ game.away_team.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <div class="grid gap-4 xl:grid-cols-3">
        <div class="card">
          <h2 class="card-title">Details</h2>
          <div class="text-center card-body">
            <div class="text-lg">
              <span class="italic">{{ game.location }}</span>
              <br />
              {{ game.home_team.city }}, {{ game.home_team.state }}
            </div>
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
              <div class="ml-2 badge badge-default badge-outline" v-if="game.network">
                {{ game.network }}
              </div>
            </h4>
          </div>
        </div>
        <div class="md:col-span-2 md:row-span-2">
          <div class="mb-6 card card-compact">
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
                <tbody v-if="game.winning_team">
                  <tr>
                    <th colspan="3" class="bg-base-300">Points</th>
                  </tr>
                  <tr>
                    <th>Final</th>
                    <td class="text-center">{{ game.home_team_stats.final }}</td>
                    <td class="text-center">{{ game.away_team_stats.final }}</td>
                  </tr>
                  <tr>
                    <th>1st Quarter</th>
                    <td class="text-center">{{ game.home_team_stats.q1 }}</td>
                    <td class="text-center">{{ game.away_team_stats.q1 }}</td>
                  </tr>
                  <tr>
                    <th>2nd Quarter</th>
                    <td class="text-center">{{ game.home_team_stats.q2 }}</td>
                    <td class="text-center">{{ game.away_team_stats.q2 }}</td>
                  </tr>
                  <tr>
                    <th>3rd Quarter</th>
                    <td class="text-center">{{ game.home_team_stats.q3 }}</td>
                    <td class="text-center">{{ game.away_team_stats.q3 }}</td>
                  </tr>
                  <tr>
                    <th>4th Quarter</th>
                    <td class="text-center">{{ game.home_team_stats.q4 }}</td>
                    <td class="text-center">{{ game.away_team_stats.q4 }}</td>
                  </tr>
                  <tr>
                    <th>Overtime</th>
                    <td class="text-center">{{ game.home_team_stats.ot || '-' }}</td>
                    <td class="text-center">{{ game.away_team_stats.ot || '-' }}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="3">None</td>
                  </tr>
                </tbody>
              </table>
              <table class="table mt-6 table-compact" v-if="false">
                <thead>
                  <tr>
                    <th>Stat</th>
                    <th class="text-center">{{ game.home_team.name_short }}</th>
                    <th class="text-center">{{ game.away_team.name_short }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Rushing Yards</th>
                    <th class="text-center">{{ game.home_team_stats.rushing_yards }}</th>
                    <th class="text-center">{{ game.away_team_stats.rushing_yards }}</th>
                  </tr>
                  <tr>
                    <th class="pl-6">Rushing Attempts</th>
                    <td class="text-center">{{ game.home_team_stats.rushing_attempts }}</td>
                    <td class="text-center">{{ game.away_team_stats.rushing_attempts }}</td>
                  </tr>
                  <tr>
                    <th>Passing Yards</th>
                    <th class="text-center">{{ game.home_team_stats.passing_yards }}</th>
                    <th class="text-center">{{ game.away_team_stats.passing_yards }}</th>
                  </tr>
                  <tr>
                    <th class="pl-6">Passing Attempts</th>
                    <td class="text-center">{{ game.home_team_stats.passing_attempts }}</td>
                    <td class="text-center">{{ game.away_team_stats.passing_attempts }}</td>
                  </tr>
                  <tr>
                    <th class="pl-6">Passing Completions</th>
                    <td class="text-center">{{ game.home_team_stats.passing_completions }}</td>
                    <td class="text-center">{{ game.away_team_stats.passing_completions }}</td>
                  </tr>
                  <tr>
                    <th>Turnovers</th>
                    <td class="text-center">{{ game.home_team_stats.turnovers }}</td>
                    <td class="text-center">{{ game.away_team_stats.turnovers }}</td>
                  </tr>
                  <tr>
                    <th>Penalty Yards</th>
                    <td class="text-center">{{ game.home_team_stats.penalty_yards }}</td>
                    <td class="text-center">{{ game.away_team_stats.penalty_yards }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card" v-if="false">
            <div class="card-body">
              <h2 class="text-xl font-semibold uppercase">Team Comparison</h2>
            </div>
          </div>
          <div class="grid gap-4 mt-3 md:grid-cols-3" v-if="false">
            <div class="card">
              <div class="card-body" v-if="!loading">
                <h5 class="font-bold">Scoring Margin</h5>
                <h6>{{ game.home_team.name_short }}: &mdash;</h6>
                <h6>{{ game.away_team.name_short }}: &mdash;</h6>
              </div>
            </div>
            <div class="card">
              <div class="card-body" v-if="!loading">
                <h5 class="font-bold">Total Offense</h5>
                <h6>{{ game.home_team.name_short }}: &mdash;</h6>
                <h6>{{ game.away_team.name_short }}: &mdash;</h6>
              </div>
            </div>
            <div class="card">
              <div class="card-body" v-if="!loading">
                <h5 class="font-bold">Opponent Total Offense</h5>
                <h6>{{ game.home_team.name_short }}: &mdash;</h6>
                <h6>{{ game.away_team.name_short }}: &mdash;</h6>
              </div>
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
    var gameId = this.$route.params.id.toString()

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
