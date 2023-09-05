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
      <div class="block text-xl text-center sm:hidden">
        <div class="grid items-center grid-cols-3">
          <div>
            {{
              new Date(props.game.datetime).toLocaleDateString('en-us', {
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              })
            }}
          </div>
          <div>
            <h3 class="text-2xl text-primary">
              {{ props.game.home_team_stats.final }}
              &mdash;
              {{ props.game.away_team_stats.final }}
            </h3>
          </div>
          <div>
            {{ props.game.time }}
          </div>
        </div>
        <div class="mb-0 divider"></div>
      </div>
      <div class="grid items-center grid-cols-2 gap-4 md:grid-cols-3 justify-items-stretch">
        <div>
          <div class="items-center text-center card-body">
            <img :src="`../teamLogos/${props.game.home_team.logo}`" class="w-24" />
            <div class="hidden md:block">
              <span
                v-if="
                  props.game.predicted_winning_team &&
                  props.game.home_team.slug == props.game.predicted_winning_team.slug
                "
              >
                {{ props.game.home_team.name_short }}
                <span class="mx-1 badge badge-accent badge-outline">-{{ props.game.spread }}</span>
              </span>
              <span v-else>{{ props.game.home_team.name_short }}</span>
            </div>
            <div class="block md:hidden">
              {{ props.game.home_team.name_abbr }}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 text-white rounded-full bg-error"
              v-if="!props.awayTeamPicked && props.game.winning_team.id == props.game.away_team.id"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 text-white rounded-full bg-success"
              v-if="props.homeTeamPicked && props.game.winning_team.id == props.game.home_team.id"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 rounded-full text-base-100 bg-base-300"
              v-if="!props.homeTeamPicked"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div class="hidden text-center md:block">
          <div>
            <h3 class="mb-4 text-2xl text-primary">
              {{ props.game.home_team_stats.final }}
              &mdash;
              {{ props.game.away_team_stats.final }}
            </h3>
            {{ props.game.location }}
            <br />
            {{ props.game.home_team.city }}, {{ props.game.home_team.state }}
          </div>
          <div class="w-full my-5">
            <div class="divider">
              <router-link
                v-bind:to="{ name: 'cfb_game', params: { id: props.game.id.toString() } }"
                class="btn btn-sm btn-primary"
              >
                Game details
              </router-link>
            </div>
          </div>
          <div>
            {{
              new Date(props.game.datetime).toLocaleDateString('en-us', {
                month: 'short',
                day: '2-digit',
                weekday: 'long'
              })
            }}
            <br />
            {{ props.game.time }}
            <div class="ml-2 badge badge-default badge-outline" v-if="props.game.network">
              {{ props.game.network }}
            </div>
          </div>
        </div>
        <div>
          <div class="items-center text-center card-body">
            <img :src="`../teamLogos/${props.game.away_team.logo}`" class="w-24" />
            <div class="hidden md:block">
              <span
                v-if="
                  props.game.predicted_winning_team &&
                  props.game.away_team.slug == props.game.predicted_winning_team.slug
                "
              >
                {{ props.game.away_team.name_short }}
                <span class="mx-1 badge badge-accent badge-outline">-{{ props.game.spread }}</span>
              </span>
              <span v-else>{{ props.game.away_team.name_short }}</span>
            </div>
            <div class="block md:hidden">
              {{ props.game.away_team.name_abbr }}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 text-white rounded-full bg-error"
              v-if="!props.homeTeamPicked && props.game.winning_team.id == props.game.home_team.id"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 text-white rounded-full bg-success"
              v-if="props.awayTeamPicked && props.game.winning_team.id == props.game.away_team.id"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10 mt-2 rounded-full text-base-100 bg-base-300"
              v-if="!props.awayTeamPicked"
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
      <div class="block mx-auto text-center md:hidden">
        <router-link
          v-bind:to="{ name: 'cfb_game', params: { id: props.game.id.toString() } }"
          class="mt-2 btn btn-sm btn-primary"
        >
          Game details
        </router-link>
      </div>
    </div>
  </div>
</template>
