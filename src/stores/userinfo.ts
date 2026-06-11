import { getUserInfoById, login } from '@/service/apis/login'
import type { IAccount, IUserInfo } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTokenStore } from './token'
import { USERINFO_KEY } from '@/global/constant'
export const useUserInfoStore = defineStore(
  'userinfo',
  () => {
    const userInfo = ref<IUserInfo>({} as IUserInfo)
    async function loginAction(account: IAccount) {
      const res = await login(account)
      await useTokenStore().setToken(res.token)
      // 登录成功后，获取用户信息
      const userInfoRes = await getUserInfoById(res.id)
      userInfo.value = userInfoRes
    }
    return {
      userInfo,
      loginAction,
    }
  },
  {
    persist: {
      key: USERINFO_KEY,
    },
  },
)
