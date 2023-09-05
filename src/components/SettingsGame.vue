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
          <div class="flex items-center space-x-3">
            <img :src="`../../teamLogos/${game.away_team.logo}`" class="w-10" />
            <router-link
              v-bind:to="{
                name: 'cfb_team',
                params: { slug: game.away_team.slug.toString() }
              }"
            >
              {{ game.away_team.name }}
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
              {{ game.home_team.name }}
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
        <td colspan="7">None</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <Spinner />
  </div>
</template>
