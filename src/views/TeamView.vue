<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import TeamNavbar from '@/components/TeamNavbar.vue'
import AlertComponent from '@/components/Alert.vue'
import GameComponent from '@/components/Game.vue'
import SpinnerComponent from '@/components/Spinner.vue'
// import { watch } from 'vue'

// let slug = this.$route.params.slug.toString()

// watch(slug, (newSlug) => {

// })
</script>

<template>
  <BaseLayout>
    <template #header>
      <div class="flex items-center space-x-4">
        <img :src="`../teamLogos/${team.logo}`" class="w-16" />
        <span>{{ team.name }}</span>
      </div>
    </template>

    <template #default>
      <AlertComponent color="error" :message="error" v-if="error" />

      <TeamNavbar :slug="team.slug" v-if="!teamLoading" />
      <SpinnerComponent v-else></SpinnerComponent>

      <div class="grid gap-4 xl:grid-cols-3">
        <div class="row-span-2 card">
          <h2 class="card-title">School Info</h2>
          <div class="card-body">
            <h4 class="text-xl italic font-bold underline">{{ team.school }}</h4>
            <h5 class="font-bold">Location</h5>
            <h6 class="italic">{{ team.city }}, {{ team.state }}</h6>
            <h5 class="font-bold">Stadium</h5>
            <h6 class="italic">{{ team.stadium_name }}</h6>
            <h5 class="font-bold">Colors</h5>
            <div class="grid grid-cols-3">
              <div
                class="h-6 col-span-2 rounded-l-xl"
                :style="{ backgroundColor: `#${team.primary_color}` }"
              ></div>
              <div
                class="h-6 rounded-r-xl"
                :style="{ backgroundColor: `#${team.secondary_color}` }"
              ></div>
            </div>
            <div class="grid grid-cols-3">
              <h6 class="col-span-2 italic text-center">#{{ team.primary_color }}</h6>
              <h6 class="italic text-center">#{{ team.secondary_color }}</h6>
            </div>
          </div>
        </div>
        <div class="col-span-2">
          <div class="card">
            <h2 class="card-title">Upcoming Game</h2>
          </div>
          <GameComponent :game="game" :isManage="false" v-if="!nextGameLoading" />
          <SpinnerComponent v-else></SpinnerComponent>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import axios from 'axios'

import type Game from '@/types/Game'
import type Team from '@/types/Team'

export default {
  data() {
    return {
      teamLoading: true,
      nextGameLoading: true,
      error: '' as String,
      team: {} as Team,
      game: {} as Game
    }
  },
  async created() {
    let slug = this.$route.params.slug.toString()

    this.getTeam(slug)
    this.getNextGame(slug)
  },
  watch: {
    '$route.params.slug': {
      handler() {
        let slug = this.$route.params.slug.toString()

        this.getTeam(slug)
        this.getNextGame(slug)
      }
    }
  },
  methods: {
    async getTeam(slug: String) {
      await axios
        .get(`teams/${slug}.json`)
        .then((response) => {
          this.team = response.data
          this.error = ''
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
        .then(() => {
          this.teamLoading = false
        })
    },
    async getNextGame(slug: String) {
      await axios
        .get(`teams/${slug}/next-game.json`)
        .then((response) => {
          this.game = response.data
          this.error = ''
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
        .then(() => {
          this.nextGameLoading = false
        })
    }
  }
}
</script>
