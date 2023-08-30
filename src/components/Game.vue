<script setup lang="ts">
import type Game from '@/types/Game'

const props = defineProps<{
  game: Game
}>()
</script>

<template>
  <div class="mt-6 card">
    <div class="card-body">
      <div class="block text-xl text-center sm:hidden">
        <div class="flex w-full">
          <div class="grid flex-grow place-items-end">
            {{
              new Date(game.datetime).toLocaleDateString('en-us', {
                month: 'short',
                day: '2-digit',
                weekday: 'long'
              })
            }}
          </div>
          <div class="divider divider-horizontal"></div>
          <div class="grid flex-grow place-items-start">
            {{ game.time }}
            <div class="ml-2 badge badge-default badge-outline" v-if="game.network">
              {{ game.network }}
            </div>
          </div>
        </div>
        <div v-if="props.game.winning_team">
          <h3 class="text-2xl text-primary">
            {{ props.game.home_team_stats.final }}
            &mdash;
            {{ props.game.away_team_stats.final }}
          </h3>
        </div>
      </div>
      <div class="grid items-center grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <router-link
            :to="{ name: 'cfb_team', params: { slug: props.game.home_team.slug.toString() } }"
          >
            <div
              class="items-center text-center card-body bg-base-100 sm:bg-base-200 rounded-xl"
              :class="{
                'card-primary':
                  props.game.winning_team && props.game.winning_team.id == props.game.home_team.id
              }"
            >
              <img :src="`../../teamLogos/${game.home_team.logo}`" class="w-16 sm:w-24" />
              <span class="hidden sm:block">{{ game.home_team.name }}</span>
              <span class="block sm:hidden">{{ game.home_team.name_short }}</span>
            </div>
          </router-link>
        </div>
        <div class="hidden text-center sm:block">
          <div v-if="props.game.winning_team">
            <h3 class="mb-2 text-2xl text-primary">
              {{ props.game.home_team_stats.final }}
              &mdash;
              {{ props.game.away_team_stats.final }}
            </h3>
          </div>
          <div>
            {{ game.location }}
            <br />
            {{ game.home_team.city }}, {{ game.home_team.state }}
          </div>
          <div class="w-full my-5">
            <div class="divider">
              <router-link
                v-bind:to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
                class="btn btn-sm btn-primary"
              >
                Game details
              </router-link>
            </div>
          </div>
          <div>
            {{
              new Date(game.datetime).toLocaleDateString('en-us', {
                month: 'short',
                day: '2-digit',
                weekday: 'long'
              })
            }}
            <br />
            {{ game.time }}
            <div class="ml-2 badge badge-default badge-outline" v-if="game.network">
              {{ game.network }}
            </div>
          </div>
        </div>
        <div>
          <router-link
            v-bind:to="{
              name: 'cfb_team',
              params: { slug: props.game.away_team.slug.toString() }
            }"
          >
            <div
              class="items-center text-center card-body bg-base-100 sm:bg-base-200 rounded-xl"
              :class="{
                'card-primary':
                  props.game.winning_team && props.game.winning_team.id == props.game.away_team.id
              }"
            >
              <img :src="`../../teamLogos/${game.away_team.logo}`" class="w-16 sm:w-24" />
              <span class="hidden sm:block">{{ game.away_team.name }}</span>
              <span class="block sm:hidden">{{ game.away_team.name_short }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <router-link
        v-bind:to="{ name: 'cfb_game', params: { id: game.id.toString() } }"
        class="inline-flex btn btn-sm btn-primary sm:hidden"
      >
        Game details
      </router-link>
    </div>
  </div>
</template>
