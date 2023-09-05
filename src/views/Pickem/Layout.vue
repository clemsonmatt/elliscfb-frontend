<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentRouteName = route.name
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #header-action>
      <slot name="pickem-header"></slot>
    </template>
    <template #default>
      <div class="grid gap-4 lg:grid-cols-3" v-if="!loading">
        <div>
          <div class="card">
            <div class="card-title">Stats</div>
            <div class="card-body">
              <div class="text-center">
                <h6 class="text-sm uppercase">Win Percentage</h6>
                <h1 class="text-6xl">{{ stats.percentage }}%</h1>
                <div class="divider"></div>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <h6 class="uppercase">Wins</h6>
                    <div class="badge badge-lg badge-default badge-outline">
                      {{ stats.wins }}
                    </div>
                  </div>
                  <div>
                    <h6 class="uppercase">Losses</h6>
                    <div class="badge badge-lg badge-default badge-outline">
                      {{ stats.losses }}
                    </div>
                  </div>
                  <div>
                    <h6 class="uppercase">Missed</h6>
                    <div class="badge badge-lg badge-default badge-outline">
                      {{ stats.misses }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 card">
            <div class="card-title">Leaderboard</div>
            <div class="card-body">
              <div>
                <table class="table w-full table-compact table-zebra">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th class="text-center">Win%</th>
                      <th class="text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user_stat in leaderboard">
                      <th>{{ user_stat.rank }}</th>
                      <td>{{ user_stat.username }}</td>
                      <td class="text-center">{{ user_stat.percentage }}%</td>
                      <td class="text-center">
                        <div
                          class="tooltip tooltip-left"
                          :data-tip="`Win: ${user_stat.wins}, Loss: ${user_stat.losses}, Miss: ${user_stat.misses}`"
                        >
                          {{ user_stat.score }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row-span-2 lg:col-span-2">
          <slot name="pickem-content"></slot>
        </div>
      </div>
      <div v-else>
        <SpinnerComponent />
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import type UserStat from '@/types/UserStat'
import type Week from '@/types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      week: '' as String,
      weeks: [] as Week[],
      error: '' as String,
      stats: {} as UserStat,
      leaderboard: [] as UserStat[]
    }
  },
  async created() {
    let week = this.$route.params.week?.toString()

    if (week != '' && week != undefined) {
      this.week = week
    }

    this.getWeeks(week)
    this.getStats()
    this.getLeaderboard()
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

          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve week data'
        })
    },
    async getStats() {
      await axios
        .get('/pickem/stats.json')
        .then((response) => {
          this.stats = response.data
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.error = error.response.data.error
        })
    },
    async getLeaderboard() {
      await axios
        .get('/pickem/leaderboard.json')
        .then((response) => {
          this.leaderboard = response.data
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.error = error.response.data.error
        })
    }
  }
}
</script>
