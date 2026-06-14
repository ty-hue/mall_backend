import type { BaseMenuItem, MenuItem } from '@/types'

export default function (menuList: MenuItem[], currentPath: string) {
  const breadcrumbList: BaseMenuItem[] = []

  // 递归查找菜单，并收集路径
  function findMenu(menus: MenuItem[], path: string): boolean {
    for (const menu of menus) {
      // 匹配当前路径
      if (menu.url === path) {
        breadcrumbList.push(menu)
        return true
      }
      // 递归遍历子菜单
      if (menu.children?.length) {
        const hasFind = findMenu(menu.children, path)
        if (hasFind) {
          // 子级命中，把当前父菜单插入数组头部
          breadcrumbList.unshift(menu)
          return true
        }
      }
    }
    return false
  }

  findMenu(menuList, currentPath)
  return breadcrumbList
}
