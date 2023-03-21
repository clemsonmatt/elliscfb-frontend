<script setup lang="ts">
  import BaseLayout from "./BaseLayout.vue"
  import ConferenceComponent from "../components/Conference.vue"
</script>

<template>
  <BaseLayout>
    <template #header>Teams</template>
    <template #default>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="conference in conferences">
          <ConferenceComponent :conference="conference" />
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
  import type Conference from "@/types/Conference"
  import type Team from "@/types/Team"
  import axios from 'axios'

  export default {
    data() {
      return {
        conferences: [] as Conference[]
      }
    },

    methods: {
      async getData() {
        try {
          // get data
          axios
            .get('http://localhost:3000/conferences.json')
            .then(response => (this.conferences = response.data))
        } catch (error) {
          console.log(error);
        }
      }
    },

    created() {
      this.getData();
    }
  }
</script>
