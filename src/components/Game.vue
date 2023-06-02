<script setup lang="ts">
import type Game from '@/types/Game'

const props = defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="mb-6 card">
    <div class="card-body">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <h3 class="text-2xl">{{ props.game.home_team.name }}</h3>
        </div>
        <div class="text-center">
          <div v-if="props.game.winning_team">
            Final
            <br />
            {{ props.game.home_team_score || '?' }}
            &mdash;
            {{ props.game.away_team_score || '?' }}
          </div>
          <div v-else>
            {{ props.game.time }}
            <br />
            {{ props.game.location }}
          </div>
        </div>
        <div>
          <h3 class="text-2xl text-right">{{ props.game.away_team.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
