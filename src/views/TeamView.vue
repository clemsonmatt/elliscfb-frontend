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
      <TeamNavbar :slug="team.slug" />

      <div class="grid xl:grid-cols-3 gap-4">
        <div class="card">
          <div class="card-body">
            <h2 class="text-2xl card-title">
              School Info
            </h2>
            <h4 class="text-xl">{{ team.name }}</h4>
            <h5 class="font-bold">Location</h5>
            <h6>&mdash;</h6>
            <h5 class="font-bold">Stadium</h5>
            <h6>&mdash;</h6>
            <h5 class="font-bold">Colors</h5>
          </div>
        </div>
        <div class="card col-span-2">
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
  export default {
    data() {
        return {
            team: {} as Team
        };
    },
    methods: {
        async getData() {
            try {
                //TODO: get data
                let slug = this.$route.params.slug.toString();
                if (slug == undefined) {
                    throw new Error("Could not find team");
                }
                this.team.name = slug.toUpperCase();
                this.team.slug = slug;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    beforeMount() {
        this.getData();
    },
    components: { TeamNavbar }
}
</script>
