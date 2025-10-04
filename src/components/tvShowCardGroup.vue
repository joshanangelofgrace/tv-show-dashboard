<template>
   <h1 class="text-lg font-extralight">{{ genre }}</h1>
    <div class="flex gap-2 overflow-x-auto overflow-y-hidden h-92">
      <template v-for="show in shows" :key="show.id">
        <tv-show-card :show="show" @click="pushToDetailsPage(show)" />
      </template>
    </div>
</template>
<script lang="ts" setup>
import type { TvShow } from '@/interfaces/tvShow';
import tvShowCard from './tvShowCard.vue';
import router from '@/router';

const props = defineProps<{
	shows: TvShow[]
  genre: string
}>()

const pushToDetailsPage = (show: TvShow) => {
  router.push({
    name: 'show-details',
    params: { id: show.id }
  })
}
</script>
