<script setup lang="ts">
import TeamLayout from './Layout.vue'
import GameComponent from '@/components/Game.vue'
import TeamHeaderComponent from '@/components/TeamHeader.vue'
import TeamNavbar from '@/components/TeamNavbar.vue'
import type Team from '@/types/Team'
import type Game from '@/types/Game'
</script>

<template>
  <TeamLayout>
    <template #team-header>
      <TeamHeaderComponent :team="team" v-if="!loading" />
    </template>

    <template #team-content>
      <TeamNavbar :slug="team.slug" v-if="!loading" />

      <div v-for="game in games" v-if="!loading">
        <GameComponent :game="game" />
      </div>
    </template>
  </TeamLayout>
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
