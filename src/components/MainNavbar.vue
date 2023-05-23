<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
const route = useRoute()
const currentRouteName = route.name
const authStore = useAuthStore()
</script>

<template>
  <div class="bg-base-200">
    <div class="xl:mx-4 2xl:container 2xl:mx-auto">
      <div class="navbar bg-base-200 xl:px-0">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
            >
              <li>
                <router-link
                  :to="{ name: 'cfb_pickem' }"
                  :class="{ active: currentRouteName == 'cfb_pickem' }"
                >
                  Pick'em
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'cfb_teams' }"
                  :class="{ active: currentRouteName == 'cfb_teams' }"
                >
                  Teams
                </router-link>
              </li>
              <li><a>Games</a></li>
              <li><a>Rankings</a></li>
            </ul>
          </div>
          <ul class="hidden px-1 lg:flex menu menu-horizontal">
            <li>
              <router-link
                :to="{ name: 'cfb_pickem' }"
                :class="{ active: currentRouteName == 'cfb_pickem' }"
              >
                Pick'em
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'cfb_teams' }"
                :class="{ active: currentRouteName == 'cfb_teams' }"
              >
                Teams
              </router-link>
            </li>
            <li><a>Games</a></li>
            <li><a>Rankings</a></li>
          </ul>
        </div>
        <div class="navbar-end">
          <div class="flex gap-2">
            <div class="form-control">
              <input type="text" placeholder="Search teams..." class="input input-bordered" />
            </div>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-circle">
                <div class="w-10 rounded-full">ME</div>
              </label>
              <ul
                tabindex="0"
                class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
              >
                <li>
                  <a class="justify-between"> Profile </a>
                </li>
                <li>
                  <router-link
                    :to="{ name: 'cfb_settings' }"
                    :class="{ active: currentRouteName == 'cfb_settings' }"
                  >
                    Settings
                  </router-link>
                </li>
                <li><a @click="authStore.logout()">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
