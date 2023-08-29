<script setup lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentRouteName = route.name
</script>

<template>
  <BaseLayout>
    <template #header>Pickem</template>
    <template #header-action>
      <a href="#" class="btn btn-primary btn-sm">Week 1</a>
    </template>
    <template #default>
      <div class="grid gap-4 lg:grid-cols-3" v-if="!loading">
        <div>
          <div class="card">
            <div class="card-title">Stats</div>
            <div class="card-body">
              <div>Coming soon...</div>
            </div>
          </div>
          <div class="mt-6 card">
            <div class="card-title">Leaderboard</div>
            <div class="card-body">
              <div>Coming soon...</div>
            </div>
          </div>
        </div>
        <div class="row-span-2 lg:col-span-2">
          <div class="grid grid-cols-2 justify-items-stretch tabs tabs-boxed">
            <router-link
              :to="{ name: 'cfb_pickem' }"
              :class="{ 'tab-active': currentRouteName == 'cfb_pickem' }"
              class="tab tab-lg"
            >
              My Picks
            </router-link>
            <router-link
              :to="{ name: 'cfb_pickem_all_picks', params: { week: week.toString() } }"
              :class="{ 'tab-active': currentRouteName == 'cfb_pickem_all_picks' }"
              class="tab tab-lg"
            >
              All Picks
            </router-link>
          </div>
          <slot name="pickem-content"></slot>
        </div>
      </div>
      <div v-else>
        <SpinnerComponent />
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import type Week from '../../types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      week: '' as String,
      weeks: [] as Week[],
      error: '' as String
    }
  },
  async created() {
    let week = this.$route.params.week?.toString()

    if (week != '' && week != undefined) {
      this.week = week
    }

    this.getWeeks(week)
  },
  methods: {
    async getWeeks(week: string) {
      // get weeks data
      await axios
        .get(`/weeks/full-season.json`)
        .then((response) => {
          this.weeks = response.data.weeks

          if (week == '' || week == undefined) {
            week = response.data.current_week.number
            this.week = week
          }

          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.error = 'Could not retrieve week data'
        })
    },
    async setWeek(number: string) {
      // update data
      this.week = number
      this.getWeeks(number)

      // update url
      this.$router.push({
        name: 'cfb_pickem',
        params: {
          week: number
        }
      })
    }
  }
}
</script>
