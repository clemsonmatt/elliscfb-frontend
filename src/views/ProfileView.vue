<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
</script>

<template>
  <BaseLayout>
    <template #header> Profile </template>

    <template #default>
      <div class="grid grid-cols-2 gap-6">
        <div class="row-span-2 card">
          <div class="card-title">My Info</div>
          <div class="card-body">
            <h3 class="text-2xl">{{ authStore.user.name }}</h3>
            <h5>
              Username: <b>{{ authStore.user.username }}</b>
            </h5>
            <h5>
              Email: <b>{{ authStore.user.email }}</b>
            </h5>
          </div>
        </div>
        <div class="card">
          <div class="card-title">Settings</div>
          <div class="card-body">Coming soon...</div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
