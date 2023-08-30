<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <template #header>
      <slot name="team-header"></slot>
    </template>

    <template #default>
      <slot name="team-content"></slot>
    </template>
  </BaseLayout>
</template>
