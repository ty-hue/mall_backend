import permissionRoutes from './permission-routes'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu'
import type { RouteRecordRaw } from 'vue-router'
export default function (): RouteRecordRaw[] {
  const matchedRoutes: RouteRecordRaw[] = []
  const menuStore = useMenuStore()
  const { menuList } = storeToRefs(menuStore)
  for (const menu of menuList.value) {
    for (const element of menu.children) {
      for (const route of permissionRoutes) {
        if (route.path === element.url) {
          matchedRoutes.push(route)
        }
      }
    }
  }
  return matchedRoutes
}
