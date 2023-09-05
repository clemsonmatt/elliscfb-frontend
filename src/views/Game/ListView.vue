<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import GameComponent from '@/components/Game.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Games</template>
    <template #header-action>
      <WeekDropdown :week="week" :weeks="weeks" @set-week="setWeek" v-if="!loading" />
    </template>
    <template #default>
      <div v-if="!loading">
        <div v-for="game in games">
          <GameComponent :game="game" />
        </div>
        <div v-if="games.length == 0">
          <div class="card">
            <div class="card-body">No games for week {{ week }}</div>
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
      this.loading = true

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
