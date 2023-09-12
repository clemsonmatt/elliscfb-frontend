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
    </div>
    <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
      <div class="p-6 sm:p-8">
        <form @submit.prevent="handleSubmit" v-if="!loading">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">
              New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button type="submit" class="w-full mt-6 btn btn-primary">Reset Password</button>
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
      password: '' as String,
      reset_token: '' as String,
      loading: false,
      error: '' as String
    }
  },
  async created() {
    // get reset token from url
    this.reset_token = this.$route.params.reset_token.toString()
  },
  methods: {
    async handleSubmit(e: { preventDefault: () => void }) {
      this.error = ''

      if (this.validate(e) == false) {
        return false
      }

      this.loading = true

      await axios
        .post('/users/reset-password', {
          reset_token: this.reset_token,
          password: this.password
        })
        .then((response) => {
          // reset form
          this.password = ''
          this.error = ''

          // redirect to login page
          this.$router.push({
            name: 'cfb_login',
            params: {
              created: 'created'
            }
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
      if (this.password && this.password.length > 7) {
        return true
      }

      if (!this.password) {
        this.error = 'Password required'
      } else if (this.password.length < 8) {
        this.error = 'Password should be at least 8 characters'
      }

      e.preventDefault()

      return false
    }
  }
}
</script>
