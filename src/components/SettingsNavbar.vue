<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteName = route.name
</script>

<template>
  <div class="mb-4 navbar bg-base-200 rounded-xl">
    <ul class="px-1 menu menu-horizontal">
      <li>
        <router-link
          :to="{ name: 'cfb_settings_games' }"
          :class="{ active: currentRouteName == 'cfb_settings_games' }"
        >
          Games
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'cfb_settings_stats' }"
          :class="{ active: currentRouteName == 'cfb_settings_stats' }"
        >
          Stats
        </router-link>
      </li>
      <li><a>People</a></li>
      <li>
        <router-link
          :to="{ name: 'cfb_settings_rankings' }"
          :class="{ active: currentRouteName == 'cfb_settings_rankings' }"
        >
          Rankings
        </router-link>
      </li>
    </ul>
  </div>
</template>
