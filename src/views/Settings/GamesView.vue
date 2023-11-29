<script setup lang="ts">
import BaseLayout from '../BaseLayout.vue'
import SettingsNavbar from '@/components/SettingsNavbar.vue'
import SettingsGame from '@/components/SettingsGame.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
import Alert from '@/components/Alert.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Settings</template>

    <template #default>
      <SettingsNavbar />

      <Alert :message="message" color="success" v-if="message" />
      <Alert :message="error" color="success" v-if="error" />

      <div class="card card-simple">
        <div class="card-title">
          <div>Week {{ week }} Games ({{ games.length }})</div>
          <div>
            <router-link class="btn btn-success btn-sm" :to="{ name: 'cfb_game_add' }">
              Add game
            </router-link>
            <WeekDropdown :week="week" :weeks="weeks" @set-week="setWeek" v-if="!loading" />
          </div>
        </div>
        <div class="card-body">
          <div class="flex justify-between pb-4 border-b border-base-100">
            <button class="btn btn-sm" @click="sendReminderEmail()">Send reminder email</button>
            <button @click="importGames()" class="btn btn-sm">
              <span v-if="games.length == 0">Import</span>
              <span v-else>Update</span>
              &nbsp;week {{ week }} games
            </button>
          </div>
          <SettingsGame :games="games" type="pickem" :loading="loading" @game-picked="gamePicked" />
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
      weeks: [] as Week[],
      pickem_games: [] as Game[],
      message: '' as String,
      error: '' as String
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
        name: 'cfb_settings_games',
        params: {
          week: number
        }
      })
    },
    async importGames() {
      this.loading = true

      await axios
        .get(`/games/${this.week}/import.json`)
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
    async gamePicked(game: Game) {
      await axios
        .post(`/games/${game.id}/toggle-pickem.json`, {
          pickem: !game.pickem
        })
        .then((response) => {
          game.pickem = !game.pickem
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async sendReminderEmail() {
      await axios
        .get('/email/send-weekly-reminder.json')
        .then((response) => {
          // show success alert
          this.message = 'Emails sent'
        })
        .catch((error) => {
          // show error alert
          this.error = error.response.data.error
          console.log(error.response.data.error)
        })
    }
  }
}
</script>
