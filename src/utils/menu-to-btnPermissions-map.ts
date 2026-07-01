import type { MenuItem } from '@/types'

export default function menuToBtnPermissionsMap(menuList: MenuItem[]) {
  const btnPermissionsSet: Set<string> = new Set()

  function collect(menus: MenuItem[]) {
    for (const item of menus) {
      if (item.permission) {
        btnPermissionsSet.add(item.permission)
      }
      if (item.children) {
        collect(item.children)
      }
    }
  }

  collect(menuList)
  return [...btnPermissionsSet]
}
