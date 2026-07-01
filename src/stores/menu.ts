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
      console.log(roleId, res)
      menuList.value = res
    }
    // 清空菜单
    const clearMenuList = () => {
      menuList.value = []
    }
    return {
      menuList,
      getMenuList,
      clearMenuList,
    }
  },
  {
    persist: {
      key: MENU_KEY,
    },
  },
)
