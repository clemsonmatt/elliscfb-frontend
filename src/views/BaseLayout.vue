<script setup lang="ts">
import MainNavbar from '../components/MainNavbar.vue'
</script>

<template>
  <MainNavbar />
  <div class="mx-4 my-8 2xl:container 2xl:mx-auto">
    <h1 class="pb-2 mb-4 border-b border-base-300">
      <div class="float-right">
        <slot name="header-action"></slot>
      </div>
      <div class="text-4xl font-bold">
        <slot name="header"></slot>
      </div>
    </h1>
    <main><slot></slot></main>
  </div>
</template>
