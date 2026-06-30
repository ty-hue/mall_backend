import type { MenuItem } from '@/types'
const btnPermissionsSet: Set<string> = new Set()

export default function menuToBtnPermissionsMap(menuList: MenuItem[]) {
  for (const item of menuList) {
    if (item.permission) {
      btnPermissionsSet.add(item.permission)
    }
    if (item.children) {
      menuToBtnPermissionsMap(item.children)
    }
  }
  // 将set中的''去除
  return [...btnPermissionsSet]
}
