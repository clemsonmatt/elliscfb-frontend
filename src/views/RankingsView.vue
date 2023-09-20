<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import Poll from '@/components/Poll.vue'
import Spinner from '@/components/Spinner.vue'
import WeekDropdown from '@/components/WeekDropdown.vue'
</script>

<template>
  <BaseLayout>
    <template #header>Rankings</template>

    <template #default>
      <div class="card card-simple">
        <div class="card-title">
          <div>Week {{ week }} Rankings</div>
          <WeekDropdown :week="week" :weeks="weeks" @set-week="setWeek" v-if="!loading" />
        </div>
        <div class="card-body">
          <div class="grid gap-4 md:grid-cols-3" v-if="!loading">
            <Poll poll="Playoff" :rankings="rankings['playoff_poll']" />
            <Poll poll="AP Top 25" :rankings="rankings['ap_poll']" />
            <Poll poll="Coaches Poll" :rankings="rankings['coaches_poll']" />
          </div>
          <div v-else>
            <Spinner />
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import type Rankings from '@/types/Rankings'
import type Week from '@/types/Week'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      rankings: {} as Rankings,
      week: '' as String,
      weeks: [] as Week[]
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
        .get(`/weeks/pickem-available.json`)
        .then((response) => {
          this.weeks = response.data.weeks

          if (week == '' || week == undefined) {
            week = response.data.current_week.number
            this.week = week
          }

          this.getRankings(week)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getRankings(week: string) {
      // get game data
      await axios
        .get(`/rankings/${week}.json`)
        .then((response) => {
          this.rankings = response.data
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.loading = false
        })
    },
    async setWeek(number: string) {
      this.loading = true

      // update data
      this.week = number
      this.getWeeks(number)

      // update url
      this.$router.push({
        name: 'cfb_rankings',
        params: {
          week: number
        }
      })
    }
  }
}
</script>
