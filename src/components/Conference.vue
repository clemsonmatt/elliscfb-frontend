<script setup lang="ts">
import type Conference from '@/types/Conference'

const props = defineProps<{
  conference: Conference
}>()
</script>

<template>
  <div class="card">
    <h2 class="card-title">{{ props.conference.name_short }}</h2>
    <div class="card-body">
      <div class="list-group">
        <div v-for="team in props.conference.teams">
          <router-link
            :to="{ name: 'cfb_team', params: { slug: team.slug.toString() } }"
            class="list-group=item"
          >
            {{ team.name_short }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
