<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import type GameForm from '@/types/GameForm'
import type Team from '@/types/Team'
import AlertComponent from '@/components/Alert.vue'
import GameFormComponent from '@/components/GameForm.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header> Add game </template>

    <template #default>
      <div v-if="complete" class="mb-4">
        <AlertComponent color="success" message="Game added" />
      </div>

      <div class="card">
        <h2 class="card-title">Details</h2>
        <div class="text-center card-body">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit" v-if="!loading">
            <div v-for="error in errors">
              <AlertComponent color="error" :message="error" />
            </div>

            <GameFormComponent :game="game" :teams="teams" />

            <button type="submit" class="float-left btn btn-primary">Save game</button>
          </form>
          <div v-else>
            <SpinnerComponent />
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
    var game = {
      date: '',
      home_team: '',
      away_team: '',
      time: '',
      location: '',
      spread: '',
      predicted_winning_team: '',
      conference_championship: 'no',
      bowl_name: '',
      canceled: ''
    }

    return {
      game: game as GameForm,
      teams: [] as Team[],
      loading: true,
      errors: [] as String[],
      complete: false
    }
  },

  async created() {
    await axios
      .get('teams.json')
      .then((response) => {
        this.teams = response.data as Team[]
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    async handleSubmit(e: { preventDefault: () => void }) {
      this.errors = []

      if (this.validate(e) == false) {
        return false
      }

      this.loading = true

      await axios
        .post(`games.json`, {
          date: this.game.date,
          home_team: this.game.home_team,
          away_team: this.game.away_team,
          time: this.game.time,
          location: this.game.location,
          spread: this.game.spread,
          predicted_winning_team: this.game.predicted_winning_team,
          conference_championship: this.game.conference_championship,
          bowl_name: this.game.bowl_name
        })
        .then((response) => {
          // reset form
          this.game.date = ''
          this.game.home_team = ''
          this.game.away_team = ''
          this.game.time = ''
          this.game.location = ''
          this.game.spread = ''
          this.game.predicted_winning_team = ''
          this.game.conference_championship = 'no'
          this.game.bowl_name = ''

          // show success message
          this.complete = true
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.errors.push(error.response.data.error)
        })
        .then(() => {
          this.loading = false
        })
    },

    validate(e: { preventDefault: () => void }) {
      var has_predicted_winning_team = this.game.predicted_winning_team.length > 0

      if (
        this.game.date &&
        this.game.home_team &&
        this.game.away_team &&
        (!has_predicted_winning_team ||
          this.game.predicted_winning_team == this.game.home_team ||
          this.game.predicted_winning_team == this.game.away_team) &&
        (!has_predicted_winning_team || (has_predicted_winning_team && this.game.spread.length > 0))
      ) {
        return true
      }

      if (!this.game.date) {
        this.errors.push('Date required')
      }
      if (!this.game.home_team) {
        this.errors.push('Home team required')
      }
      if (!this.game.away_team) {
        this.errors.push('Away team required')
      }
      if (
        has_predicted_winning_team &&
        this.game.predicted_winning_team != this.game.home_team &&
        this.game.predicted_winning_team != this.game.away_team
      ) {
        this.errors.push('Predicted winner does not match home or away team')
      }
      if (has_predicted_winning_team && this.game.spread.length == 0) {
        this.errors.push('Missing spread with predicted winner')
      }

      e.preventDefault()

      return false
    }
  }
}
</script>
