<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import TeamNavbar from '@/components/TeamNavbar.vue'
import AlertComponent from '@/components/Alert.vue'
import GameComponent from '@/components/Game.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <BaseLayout>
    <template #header>
      <div class="flex items-center space-x-4" v-if="!teamLoading">
        <img :src="`../teamLogos/${team.logo}`" class="w-16" />
        <span class="hidden md:block">{{ team.name }}</span>
        <span class="block md:hidden">{{ team.name_short }}</span>
      </div>
    </template>

    <template #default>
      <AlertComponent color="error" :message="error" v-if="error" />

      <SpinnerComponent v-if="teamLoading"></SpinnerComponent>
      <div v-else>
        <TeamNavbar :slug="team.slug" />

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
          <div class="md:col-span-2">
            <div class="mt-6 mb-0 card">
              <div class="card-body">
                <h2 class="text-xl font-semibold uppercase">Next Game</h2>
              </div>
            </div>
            <GameComponent :game="game" :isManage="false" v-if="!nextGameLoading" />
            <SpinnerComponent v-else></SpinnerComponent>
          </div>
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
