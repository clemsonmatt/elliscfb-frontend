<script setup lang="ts">
import type Ranking from '@/types/Ranking'

const props = defineProps<{
  poll: String
  rankings: Ranking[]
}>()
</script>

<template>
  <div class="card">
    <h2 class="card-title">{{ props.poll }}</h2>
    <table class="table table-zebra table-compact">
      <thead>
        <th>Rank</th>
        <th>Team</th>
      </thead>
      <tbody>
        <tr v-for="ranking in props.rankings">
          <td>{{ ranking.rank }}</td>
          <td class="flex items-center">
            <img :src="`../../teamLogos/${ranking.team.logo}`" class="w-6 mr-2" />
            {{ ranking.team.name_short }}
          </td>
        </tr>
        <tr v-if="props.rankings.length == 0">
          <td colspan="2">Not set</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
