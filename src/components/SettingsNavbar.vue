<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const currentRouteName = route.name
</script>

<template>
  <div class="navbar bg-base-200 rounded-xl mb-4">
    <ul class="menu menu-horizontal px-1">
      <li>
        <router-link :to="{ name: 'cfb_settings' }" :class="{ active: currentRouteName == 'cfb_settings' }">
          Manage Pick'em
        </router-link>
      </li>
      <li><a>Game Stats</a></li>
      <li><a>People</a></li>
    </ul>
  </div>
</template>
