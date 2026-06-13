import type { RouteRecordRaw } from 'vue-router'

const permissionRoutes: RouteRecordRaw[] = [
  {
    path: '/main/analysis/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue'),
  },
  {
    path: '/main/analysis/overview',
    name: 'Overview',
    component: () => import('@/views/main/analysis/overview/overview.vue'),
  },
  {
    path: '/main/system/department',
    name: 'Department',
    component: () => import('@/views/main/system/department/department.vue'),
  },
  {
    path: '/main/system/user',
    name: 'User',
    component: () => import('@/views/main/system/user/user.vue'),
  },
  {
    path: '/main/system/role',
    name: 'Role',
    component: () => import('@/views/main/system/role/role.vue'),
  },
  {
    path: '/main/system/menu',
    name: 'Menu',
    component: () => import('@/views/main/system/menu/menu.vue'),
  },
  {
    path: '/main/product/kind',
    name: 'ProductKind',
    component: () => import('@/views/main/product/kind/kind.vue'),
  },
  {
    path: '/main/product/info',
    name: 'ProductInfo',
    component: () => import('@/views/main/product/info/info.vue'),
  },
]
export default permissionRoutes
