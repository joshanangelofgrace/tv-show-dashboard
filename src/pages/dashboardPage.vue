<template>
  <div v-if="showStore.tvShows" class="flex flex-col gap-4 p-3">
     <SearchInput v-model="searchVal" />
     <div v-if="!searchVal">
      <div v-for="show in showStore.groupedShows" :key="show.genre.name">
          <tv-show-card-group :genre="show.genre" :shows="show.shows" />
        </div>
      </div>
      <div v-else>
        <tv-show-card-group :genre="searchGenre" :shows="searchedShows" />
      </div>
  </div>
  <div v-else class="p-3 flex flex-col gap-5 mb-2">
    <Shimmer class="w-48 h-8 rounded" />

    <Shimmer class="w-full h-32 rounded" />

    <Shimmer class="w-full h-32 rounded" />

    <Shimmer class="w-full h-32 rounded" />

    <Shimmer class="w-full h-32 rounded" />

    <Shimmer class="w-full h-32 rounded" />

    <Shimmer class="w-full h-32 rounded" />
  </div>
</template>
<script lang="ts" setup>
import tvShowCardGroup from '@/components/tvShowCardGroup.vue';
import { Messages } from '@/i18n';
import { useShowsStore } from '@/stores/shows';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SearchInput from 'vue-search-input'
import 'vue-search-input/dist/styles.css'

const t = useI18n({ inheritLocale: true, useScope: 'global' }).t
const tms = Messages

const searchVal = ref('')
const showStore = useShowsStore()

const searchedShows = computed(() => {
  if (showStore.tvShows) {
    return showStore.tvShows.filter((show) => {
      return show.name.toLowerCase().includes(searchVal.value.toLowerCase())
    })
  }
  return []
})

const searchGenre = computed(() => {
  return {
        name: t(tms.dashboard.searchTitle) + ': ' + searchVal.value,
        color: 'teal-700'
      }
})

onMounted(() => {
  showStore.loadShows()
})
</script>
