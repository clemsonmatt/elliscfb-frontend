<script setup lang="ts">
import AlertComponent from '@/components/Alert.vue'
import SpinnerComponent from '@/components/Spinner.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-1/3 mb-6 sm:w-1/6">
      <img src="/logo-dark.png" class="hidden w-full dark:inline-flex" />
      <img src="/logo-light.png" class="w-full dark:hidden" />
    </div>
    <div class="sm:max-w-md">
      <AlertComponent color="error" :message="error" v-if="error" />
      <AlertComponent color="success" :message="message" v-if="message" />
    </div>
    <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
      <div class="p-6 sm:p-8">
        <form @submit.prevent="handleSubmit" v-if="!loading">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              placeholder="Email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button type="submit" class="w-full mt-6 btn btn-primary">
            Send reset password link
          </button>
        </form>
        <div v-else>
          <SpinnerComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      email: '' as String,
      loading: false,
      error: '' as String,
      message: '' as String
    }
  },
  methods: {
    async handleSubmit(e: { preventDefault: () => void }) {
      this.error = ''
      this.message = ''
      this.loading = true

      await axios
        .post('/forgot-password', {
          email: this.email
        })
        .then((response) => {
          this.error = ''
          this.message = 'Check your email for a link to reset your password'
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>
