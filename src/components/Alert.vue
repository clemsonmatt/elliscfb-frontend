<script setup lang="ts">
const props = defineProps<{
  color: String
  message: String
}>()
</script>

<template>
  <div class="alert alert-success" v-if="color == 'success'">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 stroke-current shrink-0"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ message }}</span>
    </div>
  </div>

  <div class="alert alert-error" v-if="color == 'error'">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 stroke-current shrink-0"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span><b>Error:</b> {{ message }}</span>
    </div>
  </div>
</template>
