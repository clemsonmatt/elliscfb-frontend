<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const currentRouteName = route.name

  const props = defineProps<{
    nameShort: String
  }>()
</script>

<template>
  <div class="navbar bg-base-200 rounded-xl mb-4">
    <ul class="menu menu-horizontal px-1">
      <li>
        <router-link :to="{ name: 'cfb_team', params: { nameShort: team.nameShort.toString() }}" :class="{ active: currentRouteName == 'cfb_team' }">
          Overview
        </router-link>
      </li>
      <li><a>Schedule</a></li>
      <li><a>Rankings</a></li>
      <li><a>Statistics</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
  import type Team from '@/types/Team';

  export default {
    data() {
      return {
        team: {
          name: '',
          nameShort: '',
        } as Team
      }
    },

    methods: {
      async getData() {
        if (this.nameShort == undefined) {
          throw new Error('Could not find team')
        }

        this.team.nameShort = this.nameShort
      },
    },

    beforeMount() {
      this.getData()
    }
  }
</script>
