import type { TvShow } from '@/interfaces/tvShow'
import baseService from './baseService'

const tvService = {
  async getShows() {
    return (await baseService.processRequest<TvShow[]>('shows'))?.data
  },
  async getShow(id: string) {
    return (await baseService.processRequest<TvShow>(`shows/${id}`))?.data
  },
}

export default tvService
