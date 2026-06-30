import { usePermissionsStore } from '@/stores/permissions'
import { reactive } from 'vue'
export default function useIsHasPermissionHook(pageName: string, types: string[]) {
  const obj = reactive<Record<string, boolean>>({})
  for (const type of types) {
    const permission = `system:${pageName}:${type}`
    if (!usePermissionsStore().permissions.includes(permission)) {
      obj[type] = false
    } else {
      obj[type] = true
    }
  }
  return obj
}
