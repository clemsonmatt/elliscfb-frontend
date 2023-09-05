<script setup lang="ts">
import BaseLayout from '../BaseLayout.vue'
import SettingsGame from '@/components/SettingsGame.vue'
import SettingsNavbar from '@/components/SettingsNavbar.vue'
import Spinner from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Settings</template>

    <template #default>
      <div v-if="!loading">
        <SettingsNavbar />

        <div class="card card-simple">
          <div class="card-title">
            <div>Week {{ week }} Stats</div>
            <button @click="updateGameStats()" class="btn btn-sm">Import game stats</button>
            <div>
              <div class="dropdown dropdown-end">
                <div tabindex="0" class="m-1 btn btn-sm btn-primary">Week {{ week }}</div>
                <ul
                  tabindex="0"
                  class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
                  id="js-week-dropdown"
                >
                  <li v-for="w in weeks">
                    <a v-if="w.number.toString() == week" class="text-sm bg-primary"
                      >Week {{ w.number }}</a
                    >
                    <a v-else @click="setWeek(w.number.toString())" class="text-sm"
                      >Week {{ w.number }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body">
            <SettingsGame :games="games" type="stats" :loading="loading" />
          </div>
        </div>
      </div>
      <div v-else>
        <Spinner />
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
        .get(`/game-stats/${week}/week.json`)
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
        name: 'cfb_settings_stats',
        params: {
          week: number
        }
      })
    },
    async updateGameStats() {
      this.loading = true

      await axios
        .get(`/game-stats/${this.week}/import.json`)
        .then((response) => {
          this.games = response.data
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>
