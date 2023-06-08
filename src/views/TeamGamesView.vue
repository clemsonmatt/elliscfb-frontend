<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import type Team from '@/types/Team'
import type Game from '@/types/Game'
import TeamNavbar from '@/components/TeamNavbar.vue'
</script>

<template>
  <BaseLayout>
    <template #header>
      {{ team.name }}
    </template>

    <template #default>
      <TeamNavbar :slug="team.slug" v-if="!loading" />

      <div class="card card-compact">
        <div class="card-body">
          <table class="table table-zebra" v-if="!loading">
            <thead>
              <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>Time</th>
                <th>Location</th>
                <th>Predicted Winner</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in games">
                <td>{{ game.date }}</td>
                <td v-if="game.home_team.name_short == team.name_short">
                  <router-link :to="{ name: 'cfb_game', params: { id: game.id.toString() } }">
                    vs. {{ game.away_team.name_short }}
                  </router-link>
                </td>
                <td v-else>
                  <router-link :to="{ name: 'cfb_game', params: { id: game.id.toString() } }">
                    @ {{ game.home_team.name_short }}
                  </router-link>
                </td>
                <td>{{ game.time }}</td>
                <td>{{ game.location }}</td>
                <td>&mdash;</td>
                <td>&mdash;</td>
              </tr>
            </tbody>
          </table>
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
      loading: true,
      team: {} as Team,
      games: [] as Game[]
    }
  },
  async created() {
    // get data
    let slug = this.$route.params.slug.toString()

    await axios
      .get(`teams/${slug}/games.json`)
      .then((response) => {
        this.team = response.data.team
        this.games = response.data.games
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {
        this.loading = false
      })
  }
}
</script>
