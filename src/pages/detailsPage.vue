<template>
  <div v-if="loaded" class="p-3 flex flex-col gap-5 mb-2">
    <h1 class="text-3xl font-extralight">{{ tv?.name }}</h1>
    <div class="flex gap-2 flex-wrap">
      <img class="object-contain flex-1 max-w-72" :src="tv?.image?.medium" :alt="tv?.name" />
      <div class="flex flex-col flex-1 gap-3">
        <div v-html="tv?.summary" class="min-w-72" />
        <div class="flex">
          <a :href="tv?.officialSite" class="border border-green-500 p-4 flex hover:bg-green-50 cursor-pointer" target="_blank">
            <PlayIcon class="w-8 h-8 text-green-500" />
            <div class="m-auto">Watch Now</div>
          </a>
        </div>
      </div>
      <div class="bg-gray-100 p-3 flex-1 max-w-72 min-w-72 flex flex-col gap-1.5">
        <h2 class="text-2xl font-extralight mb-2">Show Info</h2>
        <tv-show-detail-item label="Network" :link="tv?.network?.officialSite" :link-text="tv?.network?.name" />
        <tv-show-detail-item label="Schedule" :item="scheduleText" />
        <tv-show-detail-item label="Status" :item="tv?.status" />
        <tv-show-detail-item label="Show Type" :item="tv?.type" />
        <tv-show-detail-item label="Genres" :item="genresText" />
        <tv-show-detail-item v-if="tv?.officialSite" label="Official Site" :link="tv?.officialSite" :link-text="tv?.officialSite" />
        <vue3-star-ratings v-model="rating" :disable-click="true" :numberOfStars="10" />
        <div v-if="tv?.externals.imdb" class="mt-4">
          <a :href="'https://www.imdb.com/title/' + tv?.externals.imdb" :alt="tv?.name" target="_blank"><img class="w-14" src="../assets/imdb.png" /></a>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-3 flex flex-col gap-5 mb-2">
    <Shimmer class="w-48 h-8 rounded" />

     <div class="flex gap-2 flex-wrap">
      <Shimmer class="h-72 flex-1 rounded" />
      <div class="flex-1 flex gap-2 flex-col">
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
      </div>
      <div class="bg-gray-100 p-3 flex-1 max-w-72 min-w-72 flex flex-col gap-1.5">
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
        <Shimmer class="h-4 rounded" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TvShow } from '@/interfaces/tvShow'
import { computed, onMounted, ref } from 'vue'
import tvShowDetailItem from '@/components/tvShowDetailItem.vue'
import { PlayIcon } from '@heroicons/vue/20/solid'
import tvService from '@/api/tvService'
import router from '@/router'

const tv = ref<TvShow | undefined>(undefined)
const loaded = ref<boolean>(false)
const rating = ref<number>(0)

const scheduleText = computed(() => {
  let days = ''
  tv.value?.schedule.days.forEach(day => {
    days += (days.length > 0 ? ', ' : '') + day
  })
  return days + ` at ${tv.value?.schedule.time} (${tv.value?.runtime} min)`
})

const genresText = computed(() => {
  let genres = ''
  tv.value?.genres.forEach(genre => {
    genres += (genres.length > 0 ? ', ' : '') + genre
  })
  return genres
})

const loadShow = async () => {
  const id = router.currentRoute.value.params.id
  if (id) {
    loaded.value = false
    tv.value = await tvService.getShow(id.toString())
    rating.value = tv.value?.rating.average ?? 0
    loaded.value = true
  }
}

onMounted(() => {
  loadShow()
})
</script>
