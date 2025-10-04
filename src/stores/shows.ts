import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TvShow } from '@/interfaces/tvShow'
import tvService from '@/api/tvService'

export const useShowsStore = defineStore('shows', () => {
  const tvShows = ref<TvShow[] | undefined>(undefined)

  const genres = computed(() => {
  const result: string[] = []
  tvShows.value?.forEach(x => {
      if (x && x.genres) {
        x.genres.forEach(genre => {
          if (!result.includes(genre))
            result.push(genre)
        })
      }
  })

  return result
})

const groupedShows = computed(() => {
  const result: { genre: string, shows: TvShow[] }[] = []
  genres.value.forEach(genre => {
    const group: { genre: string, shows: TvShow[] } = { genre, shows: []}
    tvShows.value?.forEach(show => {
      if (show && show.genres.includes(group.genre)) {
        group.shows.push(show)
      }
    })

    group.shows = group.shows.sort((a, b) => {
      return b.rating.average - a.rating.average
    })

    result.push(group)
  })
  return result
})

  async function loadShows() {
    if (!tvShows.value) {
      tvShows.value = await tvService.getShows()
    }
  }

  return { tvShows, genres, groupedShows, loadShows}
})
