import { createPinia } from 'pinia'
import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from '@/router'
import localCache from '@/utils/cache'
import menuToRouteMap from '@/router/menu-to-route-map'
import { MENU_KEY } from '@/global/constant'
import type { MenuItem } from '@/types'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

function registerStore(app: App) {
  app.use(pinia)
  // 页面刷新时，根据菜单动态添加路由规则
  const menuList = localCache.get<{ menuList: MenuItem[] }>(MENU_KEY)
  const matchedRoutes = menuToRouteMap(menuList?.menuList || [])
  for (const route of matchedRoutes) {
    router.addRoute('Main', route)
  }
}

export default registerStore
