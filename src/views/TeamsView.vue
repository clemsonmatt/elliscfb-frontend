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

  export default {
    data() {
      return {
        conferences: [
          {
            id: 1,
            name: 'ACC',
            teams: [
              {
                name: 'Clemson',
              },
              {
                name: 'FSU',
              },
              {
                name: 'NC State',
              }
            ] as Team[]
          },
          {
            id: 2,
            name: 'SEC',
            teams: [
              {
                name: 'Alabama',
              },
              {
                name: 'South Carolina',
              },
              {
                name: 'Georgia',
              }
            ] as Team[]
          },
          {
            id: 3,
            name: 'Big Ten',
            teams: [
              {
                name: 'Oklahoma',
              },
              {
                name: 'Oklahoma State',
              },
              {
                name: 'Arkansas',
              }
            ] as Team[]
          },
          {
            id: 3,
            name: 'PAC Ten',
            teams: [
              {
                name: 'UCLA',
              },
              {
                name: 'Oregon',
              },
              {
                name: 'USC',
              }
            ] as Team[]
          }
        ] as Conference[],
      }
    },

    methods: {
      async getData() {
        try {
          // get data
          // const response = await this.$http.get('url_here')

          // this.conferences = response.data
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
