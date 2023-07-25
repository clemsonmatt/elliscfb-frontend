<script setup lang="ts">
import type Game from '@/types/Game'

const props = defineProps<{
  game: Game
  isManage: Boolean
}>()
</script>

<template>
  <tr>
    <td>
      <router-link
        v-bind:to="{ name: 'cfb_team', params: { slug: props.game.away_team.slug.toString() } }"
      >
        {{ props.game.away_team.name }}
      </router-link>
    </td>
    <td>
      @
      <router-link
        v-bind:to="{ name: 'cfb_team', params: { slug: props.game.home_team.slug.toString() } }"
      >
        {{ props.game.home_team.name }}
      </router-link>
    </td>
    <td>
      {{ props.game.away_team.name_abbr }} {{ props.game.away_team_score || '?' }}
      ,
      {{ props.game.home_team.name_abbr }} {{ props.game.home_team_score || '?' }}
    </td>
    <td>{{ props.game.time }}</td>
    <td>{{ props.game.location }}</td>
    <td>
      <router-link
        class="btn btn-xs"
        :to="{ name: 'cfb_game', params: { id: props.game.id.toString() } }"
      >
        Details
      </router-link>
    </td>
    <td v-if="props.isManage">
      <router-link
        class="btn btn-xs btn-primary"
        :to="{ name: 'cfb_game_edit', params: { id: props.game.id.toString() } }"
      >
        Edit
      </router-link>
    </td>
  </tr>
</template>
