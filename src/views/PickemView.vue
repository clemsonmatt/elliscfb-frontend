<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #default>
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="card">
          <div class="card-title">Profile</div>
          <div class="card-body">
            <div>content here</div>
          </div>
        </div>
        <div class="card lg:col-span-2">
          <div class="card-title">
            Pick'em
            <a href="#" class="btn btn-primary btn-sm">Week 1</a>
          </div>
          <div class="card-body">
            <div>pickem games</div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
