<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteName = route.name

const props = defineProps<{
  slug: String
}>()
</script>

<template>
  <div class="mb-4">
    <ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <router-link
          :to="{ name: 'cfb_team', params: { slug: slug.toString() } }"
          :class="{ active: currentRouteName == 'cfb_team' }"
        >
          Overview
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cfb_team_games', params: { slug: slug.toString() } }"
          :class="{ active: currentRouteName == 'cfb_team_games' }"
        >
          Schedule
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cfb_team_rankings', params: { slug: slug.toString() } }"
          :class="{ active: currentRouteName == 'cfb_team_rankings' }"
        >
          Rankings
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cfb_team_statistics', params: { slug: slug.toString() } }"
          :class="{ active: currentRouteName == 'cfb_team_statistics' }"
        >
          Statistics
        </router-link>
      </li>
    </ul>
  </div>
</template>
