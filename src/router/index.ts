import { createRouter, createWebHistory } from 'vue-router'

const DashboardPage = () => import('@/pages/dashboardPage.vue')
const DetailsPage = () => import('@/pages/detailsPage.vue')
const PageNotFound  = () => import('@/pages/pageNotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
			path: '/',
			name: 'home',
			component: DashboardPage,
      meta: {
          title: 'TV Dashboard'
        }
		}, {
			path: '/show/:id',
			name: 'show-details',
			component: DetailsPage,
      meta: {
          title: 'TV Show'
        }
		},
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound,
      meta: {
        title: '404 Page Not Found'
      }
    }],
})

export default router
