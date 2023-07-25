<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import type Game from '@/types/Game'
import type GameStatForm from '@/types/GameStatForm'
import AlertComponent from '@/components/Alert.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Settings</template>

    <template #default>
      <div v-if="complete" class="mb-4">
        <AlertComponent color="success" message="Game updated" />
      </div>

      <div class="card">
        <h2 class="card-title">
          Game Stats
          <div>
            <router-link :to="{ name: 'cfb_settings_stats' }" class="mr-4 btn btn-sm">
              Game stats
            </router-link>
            <router-link
              :to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
              class="btn btn-sm btn-primary"
              v-if="!loading"
            >
              Game details
            </router-link>
          </div>
        </h2>
        <div class="card-body">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit" v-if="!loading">
            <div v-for="error in errors">
              <AlertComponent color="error" :message="error" />
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <div>
                <h3 class="text-2xl">{{ game.home_team.name }}</h3>
                <div>
                  <label for="final">Final</label>
                  <input type="number" name="final" id="final" v-model="home_stat.final" />
                </div>
                <div>
                  <label for="q1">1st Quarter</label>
                  <input type="number" name="q1" id="q1" v-model="home_stat.q1" />
                </div>
                <div>
                  <label for="q2">2nd Quarter</label>
                  <input type="number" name="q2" id="q2" v-model="home_stat.q2" />
                </div>
                <div>
                  <label for="q3">3rd Quarter</label>
                  <input type="number" name="q3" id="q3" v-model="home_stat.q3" />
                </div>
                <div>
                  <label for="q4">4th Quarter</label>
                  <input type="number" name="q4" id="q4" v-model="home_stat.q4" />
                </div>
              </div>

              <div>
                <h3 class="text-2xl">{{ game.away_team.name }}</h3>
                <div>
                  <label for="final">Final</label>
                  <input type="number" name="final" id="final" v-model="away_stat.final" />
                </div>
                <div>
                  <label for="q1">1st Quarter</label>
                  <input type="number" name="q1" id="q1" v-model="away_stat.q1" />
                </div>
                <div>
                  <label for="q2">2nd Quarter</label>
                  <input type="number" name="q2" id="q2" v-model="away_stat.q2" />
                </div>
                <div>
                  <label for="q3">3rd Quarter</label>
                  <input type="number" name="q3" id="q3" v-model="away_stat.q3" />
                </div>
                <div>
                  <label for="q4">4th Quarter</label>
                  <input type="number" name="q4" id="q4" v-model="away_stat.q4" />
                </div>
              </div>
            </div>

            <div class="divider"></div>
            <button type="submit" class="float-left btn btn-primary">Save stats</button>
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
    var home_stat = {
      final: '',
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    }
    var away_stat = {
      final: '',
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    }

    return {
      game: {} as Game,
      home_stat: home_stat as GameStatForm,
      away_stat: away_stat as GameStatForm,
      loading: true,
      errors: [] as String[],
      complete: false,
      gameId: ''
    }
  },

  async created() {
    // get data
    this.gameId = this.$route.params.id.toString()

    await axios
      .get(`games/${this.gameId}.json`)
      .then((response) => {
        this.game = response.data

        if (response.data.home_team_stats) {
          this.home_stat = response.data.home_team_stats
          this.away_stat = response.data.away_team_stats
        }

        this.loading = false
      })
      .catch((error) => {
        console.log(error)
        this.errors.push('Error loading game details')
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
        .post(`game-stats.json`, {
          game_id: this.game.id,
          home_final: this.home_stat.final,
          home_q1: this.home_stat.q1,
          home_q2: this.home_stat.q2,
          home_q3: this.home_stat.q3,
          home_q4: this.home_stat.q4,
          away_final: this.away_stat.final,
          away_q1: this.away_stat.q1,
          away_q2: this.away_stat.q2,
          away_q3: this.away_stat.q3,
          away_q4: this.away_stat.q4
        })
        .then((response) => {
          // show success message
          this.complete = true
        })
        .catch((error) => {
          console.log(error.response.data.error)
          this.errors.push(error.response.data.error)
        })
        .then(() => {
          this.loading = false

          // redirect back to the stats page
          this.$router.push({ name: 'cfb_settings_stats' })
        })
    },

    validate(e: { preventDefault: () => void }) {
      if (this.home_stat.final !== '' && this.away_stat.final !== '') {
        return true
      }

      if (this.home_stat.final === '') {
        this.errors.push('Home final score required')
      }
      if (this.away_stat.final === '') {
        this.errors.push('Away final score required')
      }

      e.preventDefault()

      return false
    }
  }
}
</script>
