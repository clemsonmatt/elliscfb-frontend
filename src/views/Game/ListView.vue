<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import GameComponent from '@/components/Game.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Games</template>
    <template #header-action>
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="m-1 btn btn-sm btn-primary">Week {{ week }}</div>
        <ul
          tabindex="0"
          class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
          id="js-week-dropdown"
        >
          <li v-for="w in weeks">
            <a v-if="w.number.toString() == week" class="bg-primary">Week {{ w.number }}</a>
            <a v-else @click="setWeek(w.number.toString())">Week {{ w.number }}</a>
          </li>
        </ul>
      </div>
    </template>
    <template #default>
      <div class="card card-compact">
        <div class="card-body">
          <table class="table" v-if="!loading">
            <thead>
              <th>Away Team</th>
              <th>Home Team</th>
              <th>Result</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th></th>
            </thead>
            <tbody v-for="game in games">
              <GameComponent :game="game" :isManage="false" />
            </tbody>
            <tbody v-if="games.length == 0">
              <tr>
                <td colspan="6">None</td>
              </tr>
            </tbody>
          </table>
          <div v-else>
            <SpinnerComponent />
          </div>
        </div>
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
        .get(`/games/${week}/week.json`)
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
        name: 'cfb_games',
        params: {
          week: number
        }
      })
    }
  }
}
</script>
