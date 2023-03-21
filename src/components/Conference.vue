<script setup lang="ts">
  import type Conference from '@/types/Conference';

  const props = defineProps<{
    conference: Conference
  }>()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h2 class="text-xl card-title">{{ props.conference.name }}</h2>
      <ul>
        <li v-for="team in props.conference.teams">
          {{ team.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
