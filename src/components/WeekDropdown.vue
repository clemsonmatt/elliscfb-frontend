<script setup lang="ts">
import type Week from '@/types/Week'

const props = defineProps<{
  week: String
  weeks: Week[]
}>()
</script>

<template>
  <details class="dropdown dropdown-end">
    <summary tabindex="0" class="m-1 btn btn-sm btn-primary">Week {{ props.week }}</summary>
    <ul
      tabindex="0"
      class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
      id="js-week-dropdown"
    >
      <li v-for="w in props.weeks">
        <a v-if="w.number.toString() == week" class="text-sm bg-primary">Week {{ w.number }}</a>
        <a v-else @click="$emit('setWeek', w.number.toString())" class="text-sm">
          Week {{ w.number }}
        </a>
      </li>
    </ul>
  </details>
</template>
