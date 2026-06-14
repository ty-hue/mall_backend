import { useTokenStore } from '@/stores/token'
import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { firstRoute } from './menu-to-route-map'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/views/main/Main.vue'),
    },
    // 404 页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
})
const whiteList = ['Login', 'NotFound']
router.beforeEach((to, from, next) => {
  const { token } = storeToRefs(useTokenStore())
  if (!whiteList.includes(to.name as string) && !token.value) {
    next({ name: 'Login' })
  } else if (to.name === 'Main' && firstRoute) {
    next({ name: firstRoute.name })
  } else {
    next()
  }
})

export default router
