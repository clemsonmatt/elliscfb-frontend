<script setup lang="ts">
import AlertComponent from '@/components/Alert.vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-1/3 mb-6 sm:w-1/6">
      <img src="/logo-dark.png" class="hidden w-full dark:inline-flex" />
      <img src="/logo-light.png" class="w-full dark:hidden" />
    </div>
    <div class="mb-6" v-if="error">
      <AlertComponent color="error" :message="error" />
    </div>
    <div v-if="created" class="mb-4">
      <AlertComponent color="success" message="Account saved! Login to proceed." />
    </div>
    <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form @submit.prevent="signin">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button type="submit" class="w-full mt-6 btn btn-primary">Sign in</button>
          <div class="divider"></div>
          <div class="flex flex-col justify-between w-full lg:flex-row">
            <div>
              <router-link :to="{ name: 'cfb_create_account' }" class="font-bold no-underline link">
                Create account
              </router-link>
            </div>
            <div>
              <br class="md:hidden" />
              <router-link
                :to="{ name: 'cfb_forgot_password' }"
                class="font-bold no-underline link"
              >
                Forgot password
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.store'

export default {
  data() {
    return {
      email: '' as String,
      password: '' as String,
      error: '' as String,
      created: false as Boolean,
      loading: false
    }
  },
  async created() {
    this.created = this.$route.params.created ? true : false
  },
  methods: {
    async signin() {
      const authStore = useAuthStore()

      return authStore.login(this.email, this.password).catch((error) => {
        this.error = error.response.data.error
      })
    }
  }
}
</script>
