<script setup lang="ts">
import BaseLayout from '../BaseLayout.vue'
import SettingsNavbar from '@/components/SettingsNavbar.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Settings</template>

    <template #default>
      <SettingsNavbar />

      <div class="card card-simple">
        <div class="card-title">
          <div>Week 1 Games</div>
          <div class="btn-group">
            <button class="btn btn-sm">Send reminder email</button>
            <button class="btn btn-sm btn-primary">Week 1</button>
          </div>
        </div>
        <div class="card-body">
          <div>TODO</div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
