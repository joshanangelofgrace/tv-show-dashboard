<template>
  <div class="min-w-36 max-w-36 cursor-pointer hover:opacity-85 hover:scale-[105%]">
    <img :src="show.image.medium" />
    <div class="bg-green-800 p-4 h-32 flex flex-col gap-1">
      <h3 class="text-white font-light">{{ show.name }}</h3>
      <vue3-star-ratings v-model="rating" :disable-click="true" :numberOfStars="10" :starSize="10" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { TvShow } from '@/interfaces/tvShow';
import { ref, watch } from 'vue';

const props = defineProps<{
	show: TvShow
}>()

const rating = ref<number>(props.show.rating.average)

watch(props.show, () => {
  rating.value = props.show.rating.average
})

</script>
