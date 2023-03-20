<script setup lang="ts">
  import MainNavbar from '../components/MainNavbar.vue'
</script>

<template>
  <MainNavbar />
  <div class="my-8 mx-4 2xl:container 2xl:mx-auto">
    <h1 class="text-3xl border-b border-base-300 pb-2 mb-4">
      <slot name="header"></slot>
    </h1>
    <main><slot></slot></main>
  </div>
</template>
