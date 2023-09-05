<script setup lang="ts">
import type Game from '@/types/Game'
import Spinner from './Spinner.vue'

const props = defineProps<{
  loading: Boolean
  games: Game[]
  type: String
}>()
</script>

<template>
  <table class="table table-compact table-zebra" v-if="!loading">
    <thead>
      <th>Pick'em</th>
      <th>Away Team</th>
      <th>Home Team</th>
      <th>Result</th>
      <th>Date</th>
      <th>Time</th>
      <th>Location</th>
      <th></th>
    </thead>
    <tbody v-for="game in props.games">
      <tr>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-auto text-white rounded-full bg-primary"
            v-if="game.pickem"
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
            class="w-6 h-6 mx-auto rounded-full text-base-100 bg-base-300"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </td>
        <td>
          <div class="flex items-center space-x-3">
            <img :src="`../../teamLogos/${game.away_team.logo}`" class="w-10" />
            <router-link
              v-bind:to="{
                name: 'cfb_team',
                params: { slug: game.away_team.slug.toString() }
              }"
            >
              <span
                v-if="
                  game.predicted_winning_team &&
                  game.away_team.slug == game.predicted_winning_team.slug
                "
              >
                {{ game.away_team.name_short }}
                <span class="badge badge-accent badge-outline">-{{ game.spread }}</span>
              </span>
              <span v-else>{{ game.away_team.name_short }}</span>
            </router-link>
          </div>
        </td>
        <td>
          <div class="flex items-center space-x-3">
            <img :src="`../../teamLogos/${game.home_team.logo}`" class="w-10" />
            <router-link
              v-bind:to="{
                name: 'cfb_team',
                params: { slug: game.home_team.slug.toString() }
              }"
            >
              <span
                v-if="
                  game.predicted_winning_team &&
                  game.home_team.slug == game.predicted_winning_team.slug
                "
              >
                {{ game.home_team.name_short }}
                <span class="badge badge-accent badge-outline">-{{ game.spread }}</span>
              </span>
              <span v-else>{{ game.home_team.name_short }}</span>
            </router-link>
          </div>
        </td>
        <td>
          <span v-if="game.canceled" class="badge badge-xs badge-warning"> Canceled </span>
          <span v-else-if="!game.winning_team">&mdash;</span>
          <span v-else>
            {{ game.away_team.name_abbr }} {{ game.away_team_stats.final }}
            ,
            {{ game.home_team.name_abbr }} {{ game.home_team_stats.final }}
          </span>
        </td>
        <td>{{ game.date }}</td>
        <td>{{ game.time }}</td>
        <td>{{ game.location }}</td>
        <td>
          <router-link
            class="btn btn-xs"
            :to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
          >
            Details
          </router-link>
        </td>
        <td v-if="props.type == 'manage'">
          <router-link
            class="btn btn-xs btn-primary"
            :to="{ name: 'cfb_game_edit', params: { id: game.id.toString() } }"
          >
            Edit
          </router-link>
        </td>
        <td v-if="props.type == 'pickem'">
          <button class="btn btn-xs btn-primary" @click="$emit('game-picked', game)">
            Pick'em
          </button>
        </td>
        <td v-if="props.type == 'stats'">
          <router-link
            class="btn btn-xs btn-primary"
            :to="{ name: 'cfb_settings_game_stat', params: { id: game.id.toString() } }"
          >
            Add Stats
          </router-link>
        </td>
      </tr>
    </tbody>
    <tbody v-if="games.length == 0">
      <tr>
        <td colspan="8">None</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <Spinner />
  </div>
</template>
