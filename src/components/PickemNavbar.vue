<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRouteName = route.name

const props = defineProps<{
  week: String
}>()
</script>

<template>
  <div class="grid grid-cols-2 justify-items-stretch tabs tabs-boxed">
    <router-link
      :to="{ name: 'cfb_pickem', params: { week: props.week.toString() } }"
      :class="{ 'tab-active': currentRouteName == 'cfb_pickem' }"
      class="tab tab-lg"
    >
      My Picks
    </router-link>
    <router-link
      :to="{ name: 'cfb_pickem_all_picks', params: { week: props.week.toString() } }"
      :class="{ 'tab-active': currentRouteName == 'cfb_pickem_all_picks' }"
      class="tab tab-lg"
    >
      All Picks
    </router-link>
  </div>
</template>
