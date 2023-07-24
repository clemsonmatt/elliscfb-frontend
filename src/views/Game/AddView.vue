<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import type Team from '@/types/Team'
import type Conference from '@/types/Conference'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header> Add game </template>

    <template #default>
      <div class="card">
        <h2 class="card-title">Details</h2>
        <div class="text-center card-body">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit" v-if="!loading">
            <div class="grid gap-4 lg:grid-cols-3">
              <div>
                <label for="date">Date</label>
                <input type="text" name="date" id="date" v-model="date" placeholder="2023-01-01" />
              </div>
              <div>
                <label for="time">Time</label>
                <input type="text" name="time" id="time" v-model="time" placeholder="12:00 PM" />
              </div>
              <div>
                <label for="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  v-model="location"
                  placeholder="Seneca, SC"
                />
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
                <input type="text" name="spread" id="spread" v-model="spread" placeholder="10" />
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
                  <input
                    type="text"
                    name="bowl_name"
                    id="bowl_name"
                    v-model="bowl_name"
                    placeholder="Bowl Name"
                  />
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
      loading: true
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
    async handleSubmit() {
      // TODO: loading icon
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
          // TODO: add page success message
          console.log('success!')
          console.log(response.data)
        })
        .catch((error) => {
          // TODO: add page success message
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}

// TODO:
// 2. validation
// 3. alert message
</script>
