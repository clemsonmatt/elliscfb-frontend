<script setup lang="ts">
  import BaseLayout from "./BaseLayout.vue"
  import type Team from "@/types/Team"
  import TeamNavbar from "@/components/TeamNavbar.vue"
</script>

<template>
  <BaseLayout>
    <template #header>
      {{ team.name }}
    </template>

    <template #default>
      <TeamNavbar :slug="team.slug" v-if="!loading" />

      <div class="grid gap-4 xl:grid-cols-3">
        <div class="card">
          <div class="card-body">
            <h2 class="text-2xl card-title">
              School Info
            </h2>
            <h4 class="text-xl italic font-bold underline">{{ team.name }}</h4>
            <h5 class="font-bold">Location</h5>
            <h6 class="italic">{{ team.city }}, {{ team.state }}</h6>
            <h5 class="font-bold">Stadium</h5>
            <h6 class="italic">{{ team.stadium_name }}</h6>
            <h5 class="font-bold">Colors</h5>
            <div class="grid grid-cols-3">
              <div class="h-6 col-span-2 rounded-l-xl" :style="{ backgroundColor: `#${team.primary_color}` }"></div>
              <div class="h-6 rounded-r-xl" :style="{ backgroundColor: `#${team.secondary_color}` }"></div>
            </div>
            <div class="grid grid-cols-3">
              <h6 class="col-span-2 italic text-center">#{{ team.primary_color }}</h6>
              <h6 class="italic text-center">#{{ team.secondary_color }}</h6>
            </div>
          </div>
        </div>
        <div class="col-span-2 card">
          <div class="card-body">
            <h2 class="card-title">
              Upcoming Game
            </h2>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
  import axios from 'axios'

  export default {
    data() {
        return {
          loading: true,
          team: {} as Team,
        };
    },
    async created() {
      // get data
      let slug = this.$route.params.slug.toString();

      await axios
        .get(`http://localhost:3000/teams/${slug}.json`)
        .then(response => {
          this.team = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    }
}
</script>
