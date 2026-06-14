import permissionRoutes from './permission-routes'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types'
let firstRoute: RouteRecordRaw | undefined = undefined
export default function (menuList: MenuItem[]): RouteRecordRaw[] {
  const matchedRoutes: RouteRecordRaw[] = []
  for (const menu of menuList) {
    for (const element of menu.children) {
      for (const route of permissionRoutes) {
        if (route.path === element.url) {
          matchedRoutes.push(route)
        }
      }
    }
  }
  if (matchedRoutes.length > 0) {
    firstRoute = matchedRoutes[0]
  }
  return matchedRoutes
}
export { firstRoute }
