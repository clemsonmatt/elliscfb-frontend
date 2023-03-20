<script setup lang="ts">
  import BaseLayout from "./BaseLayout.vue"
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #default>
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Profile</div>
            <p>content here</p>
          </div>
        </div>
        <div class="card lg:col-span-2">
          <div class="card-body">
            <div class="card-title flex justify-between">
              Pick'em
              <a href="#" class="btn btn-primary btn-sm">Week 1</a>
            </div>
            <p>pickem games</p>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
