<script setup lang="ts">
import TeamLayout from './Layout.vue'
import TeamHeaderComponent from '@/components/TeamHeader.vue'
import TeamNavbarComponent from '@/components/TeamNavbar.vue'
</script>

<template>
  <TeamLayout>
    <template #team-header>
      <TeamHeaderComponent :team="team" v-if="!teamLoading" />
    </template>

    <template #team-content>
      <TeamNavbarComponent :slug="team.slug" v-if="!teamLoading" />
      <div class="mt-6 card">
        <div class="card-body">Coming soon...</div>
      </div>
    </template>
  </TeamLayout>
</template>

<script lang="ts">
import axios from 'axios'

import type Team from '@/types/Team'

export default {
  data() {
    return {
      teamLoading: true,
      error: '' as String,
      team: {} as Team
    }
  },
  async created() {
    let slug = this.$route.params.slug.toString()

    this.getTeam(slug)
  },
  methods: {
    async getTeam(slug: String) {
      await axios
        .get(`teams/${slug}.json`)
        .then((response) => {
          this.team = response.data
          this.error = ''
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
        .then(() => {
          this.teamLoading = false
        })
    }
  }
}
</script>
