import './styles/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3StarRatings from 'vue3-star-ratings'
import Shimmer from 'vue3-loading-shimmer'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)

app.component('vue3-star-ratings', vue3StarRatings);
app.component('Shimmer', Shimmer)

app.use(createPinia())
   .use(i18n)
   .use(router)

app.mount('#app')
