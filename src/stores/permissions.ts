import { PERMISSIONS_KEY } from '@/global/constant'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionsStore = defineStore(
  'permissions',
  () => {
    const permissions = ref<string[]>([])
    const setPermissions = async (value: string[]) => {
      permissions.value = value
    }
    const removePermissions = async () => {
      permissions.value = []
    }
    return {
      permissions,
      setPermissions,
      removePermissions,
    }
  },
  {
    persist: {
      key: PERMISSIONS_KEY,
    },
  },
)
