<script setup lang="ts">
  import BaseLayout from './BaseLayout.vue'
  import SettingsNavbar from '@/components/SettingsNavbar.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Settings</template>

    <template #default>
      <SettingsNavbar />

      <div class="flex justify-between border-b border-base-300 pb-4">
        <div class="text-2xl">Week 1 Games</div>
        <div class="btn-group">
          <button class="btn btn-sm">Send reminder email</button>
          <button class="btn btn-sm btn-primary">Week 1</button>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
