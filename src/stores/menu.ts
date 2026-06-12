import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/login'
import { ref } from 'vue'
import { getMenuByRoleId } from '@/service/apis/login'
import { MENU_KEY } from '@/global/constant'

export const useMenuStore = defineStore(
  'menu',
  () => {
    const menuList = ref<MenuItem[]>([])
    // 请求菜单
    const getMenuList = async (roleId: number) => {
      const res = await getMenuByRoleId(roleId)
      menuList.value = res
    }
    return {
      menuList,
      getMenuList,
    }
  },
  {
    persist: {
      key: MENU_KEY,
    },
  },
)
