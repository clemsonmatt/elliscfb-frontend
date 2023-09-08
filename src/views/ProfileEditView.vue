<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
import AlertComponent from '@/components/Alert.vue'
import SpinnerComponent from '@/components/Spinner.vue'
import type User from '@/types/User'
import { useAuthStore } from '@/stores/auth.store'
</script>

<template>
  <BaseLayout>
    <template #header> Profile </template>

    <template #default>
      <div class="card">
        <h2 class="card-title">My Info</h2>
        <div class="text-center card-body">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit" v-if="!loading">
            <AlertComponent color="error" :message="error" v-if="error" />

            <div>
              <label for="username">Username</label>
              <input type="text" name="username" id="username" v-model="person.username" />
            </div>
            <button type="submit" class="float-left btn btn-primary">Update profile</button>
          </form>
          <div v-else>
            <SpinnerComponent />
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
    var person = {
      username: '' as String
    }

    return {
      person: person as User,
      loading: true,
      error: '' as String,
      complete: false
    }
  },

  async created() {
    this.getPerson()
  },

  methods: {
    async getPerson() {
      await axios
        .get('/users/details')
        .then((response) => {
          this.person = response.data.user
          this.loading = false
        })
        .catch((error) => {
          this.error = error.response.data.error
        })
    },

    async handleSubmit(e: { preventDefault: () => void }) {
      this.error = ''

      if (this.validate(e) == false) {
        return false
      }

      this.loading = true

      await axios
        .patch(`/users/update.json`, {
          username: this.person.username
        })
        .then((response) => {
          // update local storage
          const authStore = useAuthStore()
          authStore.profileUpdated(response.data)

          // redirect back to profile
          this.$router.push({
            name: 'cfb_profile'
          })
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
        .then(() => {
          this.loading = false
        })
    },

    validate(e: { preventDefault: () => void }) {
      if (this.person.username) {
        return true
      }

      this.error = 'All fields required'

      e.preventDefault()

      return false
    }
  }
}
</script>
