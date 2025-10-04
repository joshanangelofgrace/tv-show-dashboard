export interface TvShow {
	id: number
	url: string
	name: string
	type: string
	language: string
	genres: string[]
	status: string
	runtime: number
	averageRuntime: number
	premiered: string
	ended: string
	officialSite: string
	schedule: {
    time: string,
    days: string[]
  },
  rating: {
    average: number
  },
  externals: {
    tvrage: number,
    thetvdb: number,
    imdb: string
  },
  _links: {
    self: {
      href: string
    },
    previousepisode: {
      href: string,
      name: string
    }
  }
  weight: number,
  image: {
    medium: string,
    original: string
  },
  network: {
    id: number,
    name: string,
    country: {
      name: string,
      code: string,
      timezone: string,
    },
    officialSite: string
  },
  summary: string
}
