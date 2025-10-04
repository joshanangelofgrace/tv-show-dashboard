<template>
   <h1 class="text-xl font-semibold">{{ genre.name }}</h1>
    <div class="flex gap-2 overflow-x-auto overflow-y-hidden h-92">
      <template v-for="show in shows" :key="show.id">
        <tv-show-card :show="show" :card-color="genre.color" @click="pushToDetailsPage(show)" />
      </template>
    </div>
</template>
<script lang="ts" setup>
import type { TvShow } from '@/interfaces/tvShow';
import tvShowCard from './tvShowCard.vue';
import router from '@/router';
import type { Genre } from '@/interfaces/genre';

defineProps<{
	shows: TvShow[]
  genre: Genre
}>()

const pushToDetailsPage = (show: TvShow) => {
  router.push({
    name: 'show-details',
    params: { id: show.id }
  })
}
</script>
