<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      EllisCFB
    </a>
    <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="space-y-4 md:space-y-6" @submit.prevent="signin">
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
          <button type="submit" class="w-full btn btn-primary">Sign in</button>
          <div class="divider"></div>
          <div class="flex flex-col justify-between w-full lg:flex-row">
            <div>
              <a href="#" class="font-bold no-underline link">Create account</a>
            </div>
            <div>
              <a href="#" class="font-bold no-underline link">Forgot password</a>
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
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signin() {
      const authStore = useAuthStore()

      return authStore.login(this.email, this.password).catch((error) => {
        this.error = (error.response && error.response.data && error.response.data.error) || ''
        console.log('signin failed...')
        console.log(error)
      })
    }
  }
}
</script>
