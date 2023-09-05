<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
const route = useRoute()
const currentRouteName = route.name
const authStore = useAuthStore()
</script>

<template>
  <div class="bg-base-200">
    <div class="pb-0 navbar">
      <div class="flex-none">
        <div class="dropdown lg:hidden">
          <label tabindex="0" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
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
            <li>
              <router-link
                :to="{ name: 'cfb_games' }"
                :class="{ active: currentRouteName == 'cfb_games' }"
              >
                Games
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'cfb_rankings' }"
                :class="{ active: currentRouteName == 'cfb_rankings' }"
              >
                Rankings
              </router-link>
            </li>
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
          <li>
            <router-link
              :to="{ name: 'cfb_games' }"
              :class="{ active: currentRouteName == 'cfb_games' }"
            >
              Games
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'cfb_rankings' }"
              :class="{ active: currentRouteName == 'cfb_rankings' }"
            >
              Rankings
            </router-link>
          </li>
        </ul>
      </div>
      <div class="flex-1"></div>
      <div class="flex-none">
        <div class="flex gap-2">
          <div class="form-control" v-if="false">
            <input type="text" placeholder="Search teams..." class="input input-bordered" />
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-circle">
              <div class="w-10 rounded-full">{{ authStore.user.initials }}</div>
            </label>
            <ul
              tabindex="0"
              class="p-2 mt-3 shadow-lg menu dropdown-content bg-base-200 rounded-box w-52"
            >
              <li>
                <router-link :to="{ name: 'cfb_profile' }" class="justify-between">
                  Profile
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'cfb_settings_pickem' }"
                  :class="{ active: $route.fullPath.includes('settings') }"
                  v-if="authStore.canManage"
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
</template>
