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
            <router-link
              :to="{ name: 'cfb_settings_stats', params: { week: week } }"
              class="mr-4 btn btn-sm"
            >
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
                <div class="flex items-center space-x-3">
                  <img :src="`../../../teamLogos/${game.away_team.logo}`" class="w-10" />
                  <h3 class="text-2xl">{{ game.away_team.name }}</h3>
                </div>
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
                <div>
                  <label for="ot">Overtime</label>
                  <input type="number" name="ot" id="ot" v-model="away_stat.ot" />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="rushing_yards">Rushing Yards</label>
                  <input
                    type="number"
                    name="rushing_yards"
                    id="rushing_yards"
                    v-model="away_stat.rushing_yards"
                  />
                </div>
                <div>
                  <label for="rushing_attempts">Rushing Attempts</label>
                  <input
                    type="number"
                    name="rushing_attempts"
                    id="rushing_attempts"
                    v-model="away_stat.rushing_attempts"
                  />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="passing_yards">Passing Yards</label>
                  <input
                    type="number"
                    name="passing_yards"
                    id="passing_yards"
                    v-model="away_stat.passing_yards"
                  />
                </div>
                <div>
                  <label for="passing_attempts">Passsing Attempts</label>
                  <input
                    type="number"
                    name="passing_attempts"
                    id="passing_attempts"
                    v-model="away_stat.passing_attempts"
                  />
                </div>
                <div>
                  <label for="passing_completions">Passing Completions</label>
                  <input
                    type="number"
                    name="passing_completions"
                    id="passing_completions"
                    v-model="away_stat.passing_completions"
                  />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="turnovers">Turnovers</label>
                  <input
                    type="number"
                    name="turnovers"
                    id="turnovers"
                    v-model="away_stat.turnovers"
                  />
                </div>
                <div>
                  <label for="penalty_yards">Penalty Yards</label>
                  <input
                    type="number"
                    name="penalty_yards"
                    id="penalty_yards"
                    v-model="away_stat.penalty_yards"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center space-x-3">
                  <img :src="`../../../teamLogos/${game.home_team.logo}`" class="w-10" />
                  <h3 class="text-2xl">{{ game.home_team.name }}</h3>
                </div>
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
                <div>
                  <label for="ot">Overtime</label>
                  <input type="number" name="ot" id="ot" v-model="home_stat.ot" />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="rushing_yards">Rushing Yards</label>
                  <input
                    type="number"
                    name="rushing_yards"
                    id="rushing_yards"
                    v-model="home_stat.rushing_yards"
                  />
                </div>
                <div>
                  <label for="rushing_attempts">Rushing Attempts</label>
                  <input
                    type="number"
                    name="rushing_attempts"
                    id="rushing_attempts"
                    v-model="home_stat.rushing_attempts"
                  />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="passing_yards">Passing Yards</label>
                  <input
                    type="number"
                    name="passing_yards"
                    id="passing_yards"
                    v-model="home_stat.passing_yards"
                  />
                </div>
                <div>
                  <label for="passing_attempts">Passsing Attempts</label>
                  <input
                    type="number"
                    name="passing_attempts"
                    id="passing_attempts"
                    v-model="home_stat.passing_attempts"
                  />
                </div>
                <div>
                  <label for="passing_completions">Passing Completions</label>
                  <input
                    type="number"
                    name="passing_completions"
                    id="passing_completions"
                    v-model="home_stat.passing_completions"
                  />
                </div>
                <div class="divider"></div>
                <div>
                  <label for="turnovers">Turnovers</label>
                  <input
                    type="number"
                    name="turnovers"
                    id="turnovers"
                    v-model="home_stat.turnovers"
                  />
                </div>
                <div>
                  <label for="penalty_yards">Penalty Yards</label>
                  <input
                    type="number"
                    name="penalty_yards"
                    id="penalty_yards"
                    v-model="home_stat.penalty_yards"
                  />
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
      q4: '',
      ot: '',
      rushing_yards: '',
      rushing_attempts: '',
      passing_yards: '',
      passing_attempts: '',
      passing_completions: '',
      turnovers: '',
      penalty_yards: ''
    }
    var away_stat = {
      final: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      ot: '',
      rushing_yards: '',
      rushing_attempts: '',
      passing_yards: '',
      passing_attempts: '',
      passing_completions: '',
      turnovers: '',
      penalty_yards: ''
    }

    return {
      game: {} as Game,
      home_stat: home_stat as GameStatForm,
      away_stat: away_stat as GameStatForm,
      loading: true,
      errors: [] as String[],
      complete: false,
      gameId: '',
      week: null
    }
  },

  async created() {
    // get data
    this.gameId = this.$route.params.id.toString()

    await axios
      .get(`games/${this.gameId}.json`)
      .then((response) => {
        this.game = response.data
        this.week = response.data.week.number

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
          home_ot: this.home_stat.ot,
          home_rushing_yards: this.home_stat.rushing_yards,
          home_rushing_attempts: this.home_stat.rushing_attempts,
          home_passing_yards: this.home_stat.passing_yards,
          home_passing_attempts: this.home_stat.passing_attempts,
          home_passing_completions: this.home_stat.passing_completions,
          home_turnovers: this.home_stat.turnovers,
          home_penalty_yards: this.home_stat.penalty_yards,
          away_final: this.away_stat.final,
          away_q1: this.away_stat.q1,
          away_q2: this.away_stat.q2,
          away_q3: this.away_stat.q3,
          away_q4: this.away_stat.q4,
          away_ot: this.away_stat.ot,
          away_rushing_yards: this.away_stat.rushing_yards,
          away_rushing_attempts: this.away_stat.rushing_attempts,
          away_passing_yards: this.away_stat.passing_yards,
          away_passing_attempts: this.away_stat.passing_attempts,
          away_passing_completions: this.away_stat.passing_completions,
          away_turnovers: this.away_stat.turnovers,
          away_penalty_yards: this.away_stat.penalty_yards
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
          this.$router.push({ name: 'cfb_settings_stats', params: { week: this.week } })
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
