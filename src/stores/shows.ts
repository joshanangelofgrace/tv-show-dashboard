import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { TvShow } from '@/interfaces/tvShow'
import type { Genre } from '@/interfaces/genre'
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

  //
  const genreToColor = (genre: string) => {
    let result = 'teal-700'
    const colors = {"Drama": "blue-900",
      "Science-Fiction": "green-900",
      "Thriller": "sky-700",
      "Action": "yellow-800",
      "Crime": "lime-800",
      "Horror": "cyan-700",
      "Romance": "emerald-700",
      "Adventure": "teal-700",
      "Espionage": "cyan-700",
      "Music": "sky-700",
      "Mystery": "green-900",
      "Supernatural": "cyan-700",
      "Fantasy": "lime-800",
      "Family": "yellow-800",
      "Anime": "sky-700",
      "Comedy": "green-900",
      "History": "blue-900",
      "Medical": "emerald-700",
      "Legal": "green-800",
      "Western": "teal-700",
      "War": "lime-800",
      "Sports": "green-800"
    }
   for (const key in colors) {
    if (genre == key)
      result = colors[key]
   }
   return result
  }

const groupedShows = computed(() => {
  const result: { genre: Genre, shows: TvShow[] }[] = []
  genres.value.forEach(genre => {
    const group: { genre: Genre, shows: TvShow[] } = { genre: {
        name: genre,
        color: genreToColor(genre)
      }, shows: []}
    tvShows.value?.forEach(show => {
      if (show && show.genres.includes(group.genre.name)) {
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
