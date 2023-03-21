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
            <h6 class="italic">#{{ team.primary_color }} | #{{ team.secondary_color }}</h6>
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
