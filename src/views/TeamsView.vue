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
                nameShort: 'clemson',
              },
              {
                name: 'FSU',
                nameShort: 'fsu',
              },
              {
                name: 'NC State',
                nameShort: 'nc-state',
              }
            ] as Team[]
          },
          {
            id: 2,
            name: 'SEC',
            teams: [
              {
                name: 'Alabama',
                nameShort: 'alabama',
              },
              {
                name: 'South Carolina',
                nameShort: 'south-carolina',
              },
              {
                name: 'Georgia',
                nameShort: 'georgia',
              }
            ] as Team[]
          },
          {
            id: 3,
            name: 'Big Ten',
            teams: [
              {
                name: 'Oklahoma',
                nameShort: 'oklahoma',
              },
              {
                name: 'Oklahoma State',
                nameShort: 'oklahoma-state',
              },
              {
                name: 'Arkansas',
                nameShort: 'arkansas',
              }
            ] as Team[]
          },
          {
            id: 3,
            name: 'PAC Ten',
            teams: [
              {
                name: 'UCLA',
                nameShort: 'ucla',
              },
              {
                name: 'Oregon',
                nameShort: 'oregon',
              },
              {
                name: 'USC',
                nameShort: 'usc',
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
