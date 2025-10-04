import Axios, { type AxiosResponse } from 'axios'

const baseService = {
	baseURL() {
		return 'https://api.tvmaze.com/' //`${import.meta.env.VITE_APP_BASE_URL}`
	},
	formURL(url: string) {
		return this.baseURL() + url
	},
	generateConfigData() {
    return {
      baseURL: this.baseURL(),
      timeout: 100000,
      headers: {
        'content-type': 'application/json'
      }
    }
	},

	async processRequest<Z>(
		endpoint: string
	): Promise<Awaited<AxiosResponse<Z>> | undefined> {
		try {
          return await Axios.get<Z>(
                baseService.formURL(endpoint),
                baseService.generateConfigData()
					)
			} catch (error) {
				console.log(error)
		}
	}
}

export default baseService
