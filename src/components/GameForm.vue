<script setup lang="ts">
import type GameForm from '@/types/GameForm'
import type Team from '@/types/Team'

const props = defineProps<{
  game: GameForm
  teams: Team[]
}>()
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-3">
    <div>
      <label for="date">Date</label>
      <input type="text" name="date" id="date" v-model="game.date" />
    </div>
    <div>
      <label for="time">Time</label>
      <input type="text" name="time" id="time" v-model="game.time" />
    </div>
    <div>
      <label for="location">Location</label>
      <input type="text" name="location" id="location" v-model="game.location" />
    </div>
  </div>
  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <label for="home_team">Home team</label>
      <select v-model="game.home_team">
        <option value="">-- Home team --</option>
        <option v-for="team in teams" :value="team.slug">
          {{ team.name }}
        </option>
      </select>
      <label for="away_team">Away team</label>
      <select v-model="game.away_team">
        <option value="">-- Away team --</option>
        <option v-for="team in teams" :value="team.slug">
          {{ team.name }}
        </option>
      </select>
    </div>
    <div>
      <div>
        <label for="spread">Spread</label>
        <input type="text" name="spread" id="spread" v-model="game.spread" />
      </div>
      <div>
        <label for="predicted_winning_team">Predicted winner</label>
        <select v-model="game.predicted_winning_team">
          <option value="">-- Predicted winner --</option>
          <option v-for="team in teams" :value="team.slug">
            {{ team.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="grid gap-4 lg:grid-cols-3">
    <div>
      <div>
        <label for="conference_championship">Conference championship</label>
        <select id="conference_championship" v-model="game.conference_championship">
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </div>
    <div>
      <div>
        <label for="bowl_name">Bowl name</label>
        <input type="text" name="bowl_name" id="bowl_name" v-model="game.bowl_name" />
      </div>
    </div>
    <div>
      <label for="canceled">Canceled</label>
      <select id="canceled" v-model="game.canceled">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  </div>
  <div class="divider"></div>
</template>
