<script setup lang="ts">
  import BaseLayout from "./BaseLayout.vue"
  import ConferenceComponent from "../components/Conference.vue"
</script>

<template>
  <BaseLayout>
    <template #header>Teams</template>
    <template #default>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="conference in conferences">
          <ConferenceComponent :conference="conference" />
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
  import type Conference from "@/types/Conference"
  import axios from 'axios'

  export default {
    data() {
      return {
        conferences: [] as Conference[]
      }
    },

    async created() {
      // get data
      await axios
        .get('conferences.json')
        .then(response => {
          this.conferences = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>
