<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import type Team from '@/types/Team'
import AlertComponent from '@/components/Alert.vue'
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

            <div class="grid gap-4 lg:grid-cols-3">
              <div>
                <label for="date">Date</label>
                <input type="text" name="date" id="date" v-model="date" />
              </div>
              <div>
                <label for="time">Time</label>
                <input type="text" name="time" id="time" v-model="time" />
              </div>
              <div>
                <label for="location">Location</label>
                <input type="text" name="location" id="location" v-model="location" />
              </div>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <div>
                <label for="home_team">Home team</label>
                <select v-model="home_team">
                  <option value="">-- Home team --</option>
                  <option v-for="team in teams" :value="team.slug">
                    {{ team.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="away_team">Away team</label>
                <select v-model="away_team">
                  <option value="">-- Away team --</option>
                  <option v-for="team in teams" :value="team.slug">
                    {{ team.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <div>
                <label for="spread">Spread</label>
                <input type="text" name="spread" id="spread" v-model="spread" />
              </div>
              <div>
                <label for="predicted_winner">Predicted winner</label>
                <select v-model="predicted_winner">
                  <option value="">-- Predicted winner --</option>
                  <option v-for="team in teams" :value="team.slug">
                    {{ team.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid gap-4 lg:grid-cols-2">
              <div>
                <div>
                  <label for="conference_championship">Conference championship</label>
                  <select id="conference_championship" v-model="conference_championship">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div>
                <div>
                  <label for="bowl_name">Bowl name</label>
                  <input type="text" name="bowl_name" id="bowl_name" v-model="bowl_name" />
                </div>
              </div>
            </div>
            <div class="divider"></div>
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
    return {
      date: '' as String,
      home_team: '' as String,
      away_team: '' as String,
      time: '' as String,
      location: '' as String,
      spread: '' as String,
      predicted_winner: '' as String,
      conference_championship: 'no' as String,
      bowl_name: '' as String,
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
          date: this.date,
          home_team: this.home_team,
          away_team: this.away_team,
          time: this.time,
          location: this.location,
          spread: this.spread,
          predicted_winner: this.predicted_winner,
          conference_championship: this.conference_championship,
          bowl_name: this.bowl_name
        })
        .then((response) => {
          // reset form
          this.date = ''
          this.home_team = ''
          this.away_team = ''
          this.time = ''
          this.location = ''
          this.spread = ''
          this.predicted_winner = ''
          this.conference_championship = 'no'
          this.bowl_name = ''

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
      var has_predicted_winner = this.predicted_winner.length > 0

      if (
        this.date &&
        this.home_team &&
        this.away_team &&
        (!has_predicted_winner ||
          this.predicted_winner == this.home_team ||
          this.predicted_winner == this.away_team) &&
        (!has_predicted_winner || (has_predicted_winner && this.spread.length > 0))
      ) {
        return true
      }

      if (!this.date) {
        this.errors.push('Date required')
      }
      if (!this.home_team) {
        this.errors.push('Home team required')
      }
      if (!this.away_team) {
        this.errors.push('Away team required')
      }
      if (
        has_predicted_winner &&
        this.predicted_winner != this.home_team &&
        this.predicted_winner != this.away_team
      ) {
        this.errors.push('Predicted winner does not match home or away team')
      }
      if (has_predicted_winner && this.spread.length == 0) {
        this.errors.push('Missing spread with predicted winner')
      }

      e.preventDefault()

      return false
    }
  }
}
</script>
