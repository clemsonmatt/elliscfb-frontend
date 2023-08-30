<script setup lang="ts">
import type Game from '@/types/Game'

const props = defineProps<{
  game: Game
  awayTeamPicked: Boolean
  homeTeamPicked: Boolean
}>()
</script>

<template>
  <div class="mt-6 card">
    <div class="card-body">
      <div class="grid items-center grid-cols-3 gap-4 justify-items-stretch">
        <div class="card-link" @click="$emit('home-team-picked')">
          <div class="items-center text-center card-body">
            <img :src="`../teamLogos/${game.home_team.logo}`" class="w-24" />
            <span
              v-if="
                game.predicted_winning_team &&
                game.home_team.slug == game.predicted_winning_team.slug
              "
            >
              {{ game.home_team.name_short }} (-{{ game.spread }})
            </span>
            <span v-else>{{ game.home_team.name_short }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 rounded-full"
              :class="{
                'text-white bg-primary': homeTeamPicked,
                ' text-base-100 bg-base-300': !homeTeamPicked
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mx-auto mb-4 text-primary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            {{ game.location }}
            <br />
            {{ game.home_team.city }}, {{ game.home_team.state }}
          </div>
          <div class="w-full my-5">
            <div class="divider">
              <router-link
                v-bind:to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
                class="btn btn-sm btn-primary"
              >
                Game details
              </router-link>
            </div>
          </div>
          <div>
            {{
              new Date(game.datetime).toLocaleDateString('en-us', {
                month: 'short',
                day: '2-digit',
                weekday: 'long'
              })
            }}
            <br />
            {{ game.time }}
            <div class="ml-2 badge badge-default badge-outline" v-if="game.network">
              {{ game.network }}
            </div>
          </div>
        </div>
        <div class="card-link" @click="$emit('away-team-picked')">
          <div class="items-center text-center card-body">
            <img :src="`../teamLogos/${game.away_team.logo}`" class="w-24" />
            <span
              v-if="
                game.predicted_winning_team &&
                game.away_team.slug == game.predicted_winning_team.slug
              "
            >
              {{ game.away_team.name_short }} (-{{ game.spread }})
            </span>
            <span v-else>{{ game.away_team.name_short }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 rounded-full"
              :class="{
                'text-white bg-primary': awayTeamPicked,
                ' text-base-100 bg-base-300': !awayTeamPicked
              }"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
