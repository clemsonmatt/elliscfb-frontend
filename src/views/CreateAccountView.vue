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
    <div v-for="error in errors">
      <AlertComponent color="error" :message="error" />
    </div>
    <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-base-200">
      <div class="p-6 sm:p-8">
        <form @submit.prevent="handleSubmit" v-if="!loading">
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="first_name"
              name="first_name"
              id="first_name"
              v-model="user.first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First name"
            />
          </div>
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-900 dark:text-white">
              Last Name
            </label>
            <input
              type="last_name"
              name="last_name"
              id="last_name"
              v-model="user.last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last name"
            />
          </div>
          <div>
            <label for="username" class="block text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              v-model="user.username"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="user.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button type="submit" class="w-full mt-6 btn btn-primary">Create Account</button>
          <div class="divider"></div>
          <div class="flex flex-col justify-between w-full lg:flex-row">
            <div>
              <router-link :to="{ name: 'cfb_login' }" class="font-bold no-underline link">
                I already have an account
              </router-link>
            </div>
          </div>
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
import type CreateAccountForm from '@/types/CreateAccountForm'

export default {
  data() {
    var user = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: ''
    }

    return {
      user: user as CreateAccountForm,
      loading: false,
      errors: [] as String[]
    }
  },
  methods: {
    async handleSubmit(e: { preventDefault: () => void }) {
      this.errors = []

      if (this.validate(e) == false) {
        return false
      }

      this.loading = true

      await axios
        .post('/users', {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          username: this.user.username,
          email: this.user.email,
          password: this.user.password
        })
        .then((response) => {
          // reset form
          this.user.password = ''
          this.errors = []

          // redirect to login page
          this.$router.push({
            name: 'cfb_login',
            params: {
              created: 'created'
            }
          })
        })
        .catch((error) => {
          console.log(error.response.data.errors)
          error.response.data.errors.forEach((err: string) => {
            this.errors.push(err)
          })
        })
        .then(() => {
          this.loading = false
        })
    },

    validate(e: { preventDefault: () => void }) {
      if (
        this.user.first_name &&
        this.user.last_name &&
        this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.password.length > 7
      ) {
        return true
      }

      if (!this.user.first_name) {
        this.errors.push('First name required')
      }
      if (!this.user.last_name) {
        this.errors.push('Last name required')
      }
      if (!this.user.username) {
        this.errors.push('Username required')
      }
      if (!this.user.email) {
        this.errors.push('Email required')
      }
      if (!this.user.password) {
        this.errors.push('Password required')
      } else if (this.user.password.length < 8) {
        this.errors.push('Password should be at least 8 characters')
      }

      e.preventDefault()

      return false
    }
  }
}
</script>
