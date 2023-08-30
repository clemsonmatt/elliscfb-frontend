<script setup lang="ts">
import type Team from '@/types/Team'

const props = defineProps<{
  team: Team
}>()
</script>

<template>
  <div class="flex items-center space-x-4">
    <img :src="`../../teamLogos/${props.team.logo}`" class="w-16" />
    <span class="hidden sm:block">{{ props.team.name }}</span>
    <span class="block sm:hidden">{{ props.team.name_short }}</span>
  </div>
</template>
